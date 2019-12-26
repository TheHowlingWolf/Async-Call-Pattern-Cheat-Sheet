////////////////////////////////// Function Call Pattern For Nodejs Cheat Sheet///////////////////////////////////

                        //Remember To use :::: npm i :::: to install all node modules//

/*
///////////////////////// Handling Function Call Pattern For Nodejs/////////////////////////////
            Name:Debraj Sengupta 
            Company: Codepth
            Position: Senior Web Developer
            Type:Cheat Sheet
            Source and thanks to: Nodejs by Mosh Hamedani ('Best Teacher for Node')
///////////////////////////////////////////////////////////////////////////////////////////////////
*/


//////////////////Understanding async nature of node///////////////////////

///Example of sync prog / blocking prog

/*
console.log('Before');
console.log('After');
*/

////example of async prog

/*
console.log('Before');
setTimeout(() => {
    console.log('Reading a user from db');
}, 2000);
console.log('After');*/

///setTimeout is a non blocking function that is used to define the future calls
///async doesnt mean multithread here we have only one thread
///in node whenever using disk or network access we are using async code

////////////////Patterns for dealing with async code//////////////////////////
///if we use
/*const user = getUser(1);
console.log(user);
function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user from db');
        return { id : id, gitHUbUserName : 'mosh'};
    }, 2000);
}*/
/// We will get undefined since its not availiable as the func call has a timeout of 2 secs and its not availiable

/////////3 ways of dealing above with async code
    /*
        1.Callbacks
        2.Promises
        3.Async/await
    */


///////////////Callbacks////////////////
/*getUser(1, (user)=>{
    console.log('User',user);
});

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from db');
        callback ({ id : id, gitHUbUserName : 'mosh'});
    }, 2000);
}*/

///whenever the result to async func is ready the callback function is called
////exercise : on reading user object from data base with github username then we will list the repos associated with it

   /* getUser(1, (user)=>{
        console.log('User',user);
        //Get the repos here
        getRepositories(user.gitHUbUserName, (repos)=>{
            console.log('Repos:',repos);
        })
    });

    function getUser(id, callback) {
        setTimeout(() => {
            console.log('Reading a user from db');
            callback ({ id : id, gitHUbUserName : 'mosh'});
        }, 2000);
    }

    function getRepositories(username,callback){
        setTimeout(() => {
            console.log('Call git APi');
            callback( ['repo1','repo2','repo3']);
        }, 2000);
    }
    
   ///let us think we need to do more async operation after calling git api then this will nest more and makes it more complex 
   ///example
    /* 
    ///Async
        getUser(1, (user)=>{
        console.log('User',user);
        //Get the repos here
        getRepositories(user.gitHUbUserName, (repos)=>{
            gitCommit(repo , (commits)=>{

            });
        });
    });
    */
    /////////////This is Called CALLBACK HELL / Christmas Tree Problem///////

   /*
   ///Sync implementation of Above code
   const user = getUser(1);
   const repos = getRepositories(user.gitHubUserName);
   const commits = getCommits(repos[0]);
   ///This is much easier to read and understand
   */

   ///To overcome this issue in real world application we use  NAMED FUNCTIONS/////////

          /*   getUser(1, getRepository);

            function getRepository(user){
                console.log(5);
                console.log('User:', user);
                getRepositories(user.gitHUbUserName,getCommits);
                /// here the both getRepositories are diff as their signature of args diff
            }

            function getCommits(repos){
                console.log(6);
                console.log('repos:',repos);
                gitCommit(repos[0] , displayCommits);
            }

            function displayCommits(commits){
                console.log(commits);
            }


            ///the previous complex code is broken into levels and function references instead of function call is used in callbacks
                
            function getUser(id, callback) {
                console.log(1);
                setTimeout(() => {
                    console.log('Reading a user from db');
                    callback ({ id : id, gitHUbUserName : 'mosh'});
                }, 2000);
            }

            function getRepositories(username,callback){
                console.log(2);
                setTimeout(() => {
                    console.log('Call git APi');
                    callback(['repo1','repo2','repo3']);
                }, 2000);
            }


            function gitCommit(repo, callback){
                console.log(3);
                setTimeout(() => {
                    callback(5);
                }, 2000);
            } */

/////////////////////////////// JS Promises //////////////////////////////////
            /*

                Def: A promise is an object which holds the 
                eventual result of an asynchronous operation
            
                ** Whenever a asynchronous function completes it either results in
                value or error **


                          async operation
                Pending --------------------> Fullfilled / Rejected
            */
    ///Example
    /* //creating a promise
    const p = new Promise((resolve,reject)=>{ //resolve and reject are functions
        //kick off some async work
        //...
        //If everything goes right use resolve to return to the consumer 
        setTimeout(() => {
            resolve(1); //pending => fullfilled
            //else use reject
            reject(new Error('message')); //pending => rejected
        }, 2000);

    });
    
    //consuming a promise
    p.then(result=>{
        console.log('Result',result);
    })
    .catch(err => console.log('Error',err.message));
     */
    
            
////////Exercise: Changing callback code to promises//////
          
        /*       getUser(1, (user)=>{
                    getRepositories(user.gitHUbUserName, (repos)=>{
                        gitCommit(repo , (commits)=>{
                            console.log(commits);
                    })
                });
            });

                function getUser(id, callback) {
                    setTimeout(() => {
                        console.log('Reading a user from db');
                        callback ({ id : id, gitHUbUserName : 'mosh'});
                    }, 2000);
                }

                function getRepositories(username,callback){
                    setTimeout(() => {
                        console.log('Call git APi');
                        callback( ['repo1','repo2','repo3']);
                    }, 2000);
        } */

        ///      ||
        ///      ||
        ///     \\//
        ///      \/

        /* getUser(1, (user)=>{
            getRepositories(user.gitHUbUserName, (repos)=>{
                gitCommit(repo , (commits)=>{
                    console.log(commits);
                })
            });
        }); */

        //const p = getUser(1);///no need of having a const
        /* 
            getUser(1)
            .then((user) =>
                getRepositories(user.gitHUbUserName)
            )
            .then((repos)=>
                gitCommit(repos[0])
            )
            .then(commits => console.log('Commits',commits))
            .catch(err => console.log('Error',err.message));

        function getUser(id) {
            return new Promise ((resolve,reject)=>{
                setTimeout(() => {
                    console.log('Reading a user from db');
                    resolve({ id : id, gitHUbUserName : 'mosh'});
                }, 2000);
            });
        }

        function getRepositories(username){
            return new Promise((resolve,reject)=>{
                setTimeout(() => {
                    console.log('Call git APi');
                    resolve(['repo1','repo2','repo3']);
                }, 2000);
            });
            
        }

        function gitCommit(repo){
            return new Promise((resolve,reject)=>{
                console.log('Commiting...');
                setTimeout(() => {
                    resolve('commit');
                }, 2000);
            });
        }
 */

 ////////////////// Promise Api JS /////////////////
        /*
            Sometimes we wanna write promises which are already resolved
            these are used in unit testing

            Promise(A js class).resolve/reject(a static method)
        */

        /*    const p = Promise.resolve({id:1});
            p.then(result => console.log(result));
        */
       
        /*
            Sometimes we wanna write promises which are already resolved
            these are used in unit testing
        */

        /* const q = Promise.reject(new Error('Reason for rejection'));
        q.catch(error => console.log(error));
        //remember to use error object while rejecting promises otherwise the error stack wont show
        */


////////////////////// Parallel Promises /////////////////////////////////

        /*
            Like you want to simulate the facebook and twitter api 
            when both results are ready then we want to simulate results
        */

///Explaination

        /* 
        const p1 =  new Promise((resolve)=>{
            setTimeout(() => {
                console.log('Async Operation 1... Simulation of Facebook API');
                resolve(1);
            }, 2000);
        });

        const p2 =  new Promise((resolve)=>{
            setTimeout(() => {
                console.log('Async Operation 2... Simulation of Twitter API');
                resolve(2);
            }, 2000);
        });
        //Promise class has another static method all that is used to use parallel promises
        Promise.all([p1,p2]) // both will load "ALMOST" at the same time
        .then(result => console.log(result));
        //here remember we are not using multi-threading but single-threading with parallel promises
        
        */

        //What if One of this promises fails ........??

///Explaination
       /* 
        const p1 =  new Promise((resolve,reject)=>{
            setTimeout(() => {
                console.log('Async Operation 1... Simulation of Facebook API');
                reject(new Error('Something Failed'));
            }, 5000);
        });

        const p2 =  new Promise((resolve)=>{
            setTimeout(() => {
                console.log('Async Operation 2... Simulation of Twitter API');
                resolve(2);
            }, 1000);
        });
        
     
        Promise.all([p1, p2]) 
        .then(result => console.log(result))
        .catch(err => console.log('Error',err.message));
        */


       /* same as above
        p1.then().catch(err => console.log('Error',err.message));
       p2.then(result => console.log(result));

      but not always the time is same as above eg maybe the p1 may have 5000ms instead 2000 and p2 has 1000ms 
       then p2 line 342 of p1.then will execute first then the line 341 of p1.catch even if there is rejection 
       for p1 but in case of Promise.all([p1,p2]) it will execute whenever both is completed and there is no rejection or error
        */

        /*
            //////////TO Understand either change the above code timings or unquote the comment here
            const p1 =  new Promise((resolve,reject)=>{
                setTimeout(() => {
                    console.log('Async Operation 1... Simulation of Facebook API');
                    reject(new Error('Something Failed'));
                }, 5000);
            });

            const p2 =  new Promise((resolve)=>{
                setTimeout(() => {
                    console.log('Async Operation 2... Simulation of Twitter API');
                    resolve(2);
                }, 1000);
            });
            
            p1.then().catch(err => console.log('Error',err.message));
             p2.then(result => console.log(result));
        */


//////////////////////////// Async And Await Approach/////////////////////////////////////

            /*
               Async And Await helps to write async code like sync codes
               
               /////Lets Convert the promise code
               getUser(1)
                .then((user) =>
                    getRepositories(user.gitHUbUserName)
                )
                .then((repos)=>
                    gitCommit(repos[0])
                )
                .then(commits => console.log('Commits',commits))
                .catch(err => console.log('Error',err.message));
                //////Using Async And await
                ///// This makes code very easy to understand
            */

        /*  //////Do not uncomment this and run yet read the next section as well   
            
            const user =  await getUser(1);
            //you can await the result the promise of the function and store it in a user object
           
            const repos = await getRepositories(user.gitHUbUserName);
            const commits = await gitCommit(repos[0]);

            ////this example for await outside function call
 */


            /*
                Whenever we use await inside a function we need to decorate the function 
                with async modifier to change return type of function 

                async function tryyy()
                {
                    .....
                    const user =  await getUser(1);
                    .....
                }

                tryyy();
                ////this call will tell that tryyy is func which is a function that returns a 
                promise of void i.e a promise which once fullfilled doesnt result in a value 
                async and await is built upon promises

                Whenever js parses the above code it changes to previous promise.then code
                whenever a await is hit js releases a thread until the result is ready to do other works.
                So async and await are known as syntactical sugar
            */
    
    /* ///////////Example
    async function displayCommits(){
        const user =  await getUser(1);
        const repos = await getRepositories(user.gitHUbUserName);
        const commits = await gitCommit(repos[0]);
        console.log(commits);
    }

    displayCommits();

    function getUser(id) {
        return new Promise ((resolve,reject)=>{
            setTimeout(() => {
                console.log('Reading a user from db');
                resolve({ id : id, gitHUbUserName : 'mosh'});
            }, 2000);
        });
    }

    function getRepositories(username){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                console.log('Call git APi');
                resolve(['repo1','repo2','repo3']);
            }, 2000);
        });
        
    }

    function gitCommit(repo){
        return new Promise((resolve,reject)=>{
            console.log('Commiting...');
            setTimeout(() => {
                resolve('commit');
            }, 2000);
        });
    } */


        /*

            In Promises we had then and catch but in await and async we dont have then and catch
            we need to use try block to write our awaits which when throw error or exception then we have to 
            use catch black to get that.

            try{

            }

            catch{

            }
        
        */
/* 
    ///////////Example
    async function displayCommits(){
        try{
            const user =  await getUser(1);
            const repos = await getRepositories(user.gitHUbUserName);
            const commits = await gitCommit(repos[0]);
            console.log(commits);
        }
        catch(err)
        {
            console.log('Error', err.message);
        }
        
    }

    displayCommits();

    function getUser(id) {
        return new Promise ((resolve,reject)=>{
            setTimeout(() => {
                console.log('Reading a user from db');
                resolve({ id : id, gitHUbUserName : 'mosh'});
            }, 2000);
        });
    }
    ///lets reject this promise
    function getRepositories(username){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                console.log('Call git APi');
                reject(new Error('Could not get repos........'));
            }, 2000);
        });
        
    }

    function gitCommit(repo){
        return new Promise((resolve,reject)=>{
            console.log('Commiting...');
            setTimeout(() => {
                resolve('commit');
            }, 2000);
        });
    }  */


/////////////////////////////////// End //////////////////////////////////////////////