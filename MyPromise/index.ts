enum PromiseStatus {
    Pending = 'pending',
    Fulfilled = 'fulfilled',
    Rejected = 'rejected'
}

type ResolveFunction<T> = (value?: T | PromiseLike<T>) => void;
type RejectFunction = (reason?: any) => void;
type ExecutorFunction<T> = (
    resolve: ResolveFunction<T>,
    reject: RejectFunction
) => void;

class MyPromise<T> {
    private status: PromiseStatus;
    private value: any;
    private reason: any;
    private onFulfilledCallbacks: Array<(value: T) => void>;
    private onRejectedCallbacks: Array<(reason: any) => void>;

    constructor(executor: ExecutorFunction<T>) {
        this.status = PromiseStatus.Pending;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve: ResolveFunction<T> = (value?: T | PromiseLike<T>) => {
            if (this.status === PromiseStatus.Pending) {
                if (value instanceof MyPromise) {
                    value.then(resolve, reject);
                    return;
                }
                this.status = PromiseStatus.Fulfilled;
                this.value = value;
                this.onFulfilledCallbacks.forEach(callback => callback(value as T));
            }
        };

        const reject: RejectFunction = reason => {
            if (this.status === PromiseStatus.Pending) {
                this.status = PromiseStatus.Rejected;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(callback => callback(reason));
            }
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then<U>(
        onFulfilled?: (value: T) => U | PromiseLike<U>,
        onRejected?: (reason: any) => U | PromiseLike<U>
    ): MyPromise<U> {
        const newPromise = new MyPromise<U>((resolve, reject) => {
            const fulfilledHandler = (value: T) => {
                try {
                    const result = onFulfilled && onFulfilled(value);
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result as U);
                    }
                } catch (error) {
                    reject(error);
                }
            };

            const rejectedHandler = (reason: any) => {
                try {
                    const result = onRejected && onRejected(reason);
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result as U);
                    }
                } catch (error) {
                    reject(error);
                }
            };

            if (this.status === PromiseStatus.Pending) {
                this.onFulfilledCallbacks.push(fulfilledHandler);
                this.onRejectedCallbacks.push(rejectedHandler);
            } else if (this.status === PromiseStatus.Fulfilled) {
                setTimeout(() => fulfilledHandler(this.value as T), 0);
            } else if (this.status === PromiseStatus.Rejected) {
                setTimeout(() => rejectedHandler(this.reason), 0);
            }
        });

        return newPromise;
    }

    catch<U>(onRejected: (reason: any) => U | PromiseLike<U>): MyPromise<U> {
        return this.then(undefined, onRejected);
    }

    static resolve<T>(value?: T | PromiseLike<T>): MyPromise<T> {
        return new MyPromise(resolve => {
            resolve(value);
        });
    }

    static reject(reason?: any): MyPromise<never> {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        });
    }

    static all<T>(promises: Array<T | PromiseLike<T>>): MyPromise<T[]> {
        return new MyPromise((resolve, reject) => {
            const results: T[] = [];
            let resolvedPromises = 0;

            const checkAllPromisesResolved = () => {
                if (resolvedPromises === promises.length) {
                    resolve(results);
                }
            };

            promises.forEach((promise, index) => {
                MyPromise.resolve(promise)
                    .then(value => {
                        results[index] = value;
                        resolvedPromises++;
                        checkAllPromisesResolved();
                    })
                    .catch(reason => {
                        reject(reason);
                    });
            });
        });
    }

    static race<T>(promises: Array<T | PromiseLike<T>>): MyPromise<T> {
        return new MyPromise((resolve, reject) => {
            promises.forEach(promise => {
                MyPromise.resolve(promise).then(
                    value => {
                        resolve(value);
                    },
                    reason => {
                        reject(reason);
                    }
                );
            });
        });
    }

    static raceWithNumber<T>(promises: Array<T | PromiseLike<T>> = [], num = 1): any {
        let index = 0;
        let stack = {};
        return new MyPromise((resolve, reject) => {
            promises.forEach((promise, j) => {
                MyPromise.resolve(promise).then(val => {
                    index++;
                    stack[j] = val
                    if (index == num) {
                        resolve(Object.values(stack));
                    }
                }, (e) => {
                    reject(e)
                })
            })
        })
    }

    static limitGreedy<T> (promises: Array<T | PromiseLike<T>> = [], limit): any {
        // 维护数组，每项完成时返回索引
        const limitPromises = promises
            .splice(0, limit)
            .map(
                (promise, index) => promise.then(() => index)
            );
    
        return promises.reduce((prePromise, curPromise) => 
            prePromise
                .then(() => Promise.race(limitPromises))
                .then(finishIndex => {
                    // 将索引对应的promise替换，索引接上
                    limitPromises[finishIndex] = curPromise(finishIndex).then(() => finishIndex)
                }),
            Promise.resolve()
        ).then(() => Promise.all(limitPromises))
    }
}