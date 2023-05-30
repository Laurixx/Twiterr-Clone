// make it that when you reply to a tweet , it gets added to the replies array DONE
// fix the add tweet function so if it empty dont tweet DONE
// also try to make it a modal but dont stress if it doenst work canceled 
// comment and scan all js Done 
import { tweetsArrayData } from "./data.js";
import { user } from "./user-info.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
// setting up the local storage 
let tweetsArray =[]
if(localStorage.getItem("tweetsArray") === null){ // this simply says that if it empty set it up 
    localStorage.setItem("tweetsArray", JSON.stringify(tweetsArrayData)) //this makes my array into an object form key/value for the local storaget to get it 
    tweetsArray = JSON.parse(localStorage.getItem("tweetsArray")) //this just sets up the tweets array back to normal so i can used 
}else{
tweetsArray = JSON.parse(localStorage.getItem("tweetsArray"))  
}

function updateLocalStorage (){
    localStorage.setItem("tweetsArray", JSON.stringify(tweetsArray)) // this updates the local storage
}

document.addEventListener('click', function(e){// event listeners
    // this is text just to make sure it was working 
   //console.log(e.target.dataset);
// LIKE
    if(e.target.dataset.like){ 
        like(e.target.dataset.like)
    }
    //RETWEET
    if(e.target.dataset.retweet){
        retweet(e.target.dataset.retweet)
    }
    //REPLY
    if(e.target.dataset.reply){
        reply(e.target.dataset.reply)
    }
    //ADD TWEET
    if(e.target.id === 'tweet-btn'){
        addtweet()
    }
    // ADD REPLY
    if(e.target.id === 'reply-btn'){
        addReply(e.target.dataset.replyBtn)
    }
    // LIKE REPLY 
    if(e.target.dataset.likeReply){
        likeReply(e.target.dataset.likeReply)
    }
    //RETWEET REPLY 
    if(e.target.dataset.retweetReply){
    retweetReply(e.target.dataset.retweetReply)
    }
})
function addtweet (){
    //CREATES A NEW TWEET OBJECT 
    let createTweet = {}
   const textInp = document.getElementById('text-inp')
   createTweet = {
    name: `${user.name}`,
    handle: `${user.handle}`,
    avatar: `${user.avatar}`,
    content: `${textInp.value}`,
    isLiked: false,
    isRetweeted: false,
    likes: 0,
    retweets: 0,
    replies: [],
    uuid: uuidv4()
}

 if(textInp.value){
    // ADD THAT NEW TWEET AT THE TOP OF THE ARRAY
    tweetsArray.unshift(createTweet)
    updateLocalStorage()
    render()
 }

   }

function like(tweetId){
    // THIS GIVE ME SOME HEADACKE , cause i done it at first with .filter() method but i found out the the .find method it acctualy better if i am searching only for a single element into the array 
    
    const targetTweet = tweetsArray.find(function(tweet){ //this looks inside the array for an element that matches the tweetId witch is an param given in the eventListener 
        return tweet.uuid === tweetId
    })

    if(targetTweet.isLiked){  // if true then cut down on like and the other way around 
        targetTweet.likes--
    }
    else{
        targetTweet.likes++

    }
    targetTweet.isLiked = !targetTweet.isLiked // after every click you turn the bolean so you can only like once , or take your like back if you feel griddy 
    updateLocalStorage()// updates the local storage 
    render()
}

function retweet(tweetId){
    const targetTweet = tweetsArray.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    if(targetTweet.isRetweeted){
        targetTweet.retweets--
    }
    else{
        targetTweet.retweets++
    }
    targetTweet.isRetweeted = !targetTweet.isRetweeted
    updateLocalStorage()
    render()
}
function reply (tweetId){
 const targetTweet = tweetsArray.filter(function(tweet){
    return tweet.uuid === tweetId
 })[0]
    document.getElementById(`replies-${tweetId}`).classList.toggle('hidden') // this only toggles on and off the replies div when it's clicked 

}

function addReply (tweetId){ // this function it's very similar to the add tweet function we crete a rely and than later added to the replies array 
    const targetTweet = tweetsArray.filter(function(tweet){
        return tweet.uuid === tweetId
})[0]
  let createReply = {}
const replyInp = document.getElementById(`reply-${tweetId}`).value
    createReply = {
        name: `${user.name}`,
        handle: `${user.handle}` ,
        avatar: `${user.avatar}`,
        content: `${replyInp}`,
        isLiked: false,
        isRetweeted: false,
        likes: 0,
        retweets: 0,
        uuid: uuidv4()
    }
    if(replyInp){
        targetTweet.replies.unshift(createReply)
        updateLocalStorage()
        render()
    }
}

function likeReply(replyId) { // this is where i leaned the sintaxx of arrow fucntions , well i olnly used here cause i tried to get this to work 4 times and failed so i searched the wide web for help 
    const targetReply = tweetsArray.find((tweet) => { // so what this does is it goes inside the tweets array looks 
      return tweet.replies.find((reply) => {            // then loook for reply that contains the uuid given in the event listener 
        return reply.uuid === replyId;
      });
    });
  
    if (targetReply) {// if the variable it true than create the next one withch is the reply to like 
      const replyToLike = targetReply.replies.find((reply) => {
        return reply.uuid === replyId;
      });
  
      if (replyToLike.isLiked) {
        replyToLike.likes--;
      
      } else {
        replyToLike.likes++;
        console.log(replyToLike);
      }
  
      replyToLike.isLiked = !replyToLike.isLiked;
    }
updateLocalStorage()
render()
  }
function retweetReply (replyId){ // this is the same as the like for the reply 
    const targetTweet = tweetsArray.find((tweet) => {
        return tweet.replies.find((reply) => {
            return reply.uuid === replyId
        })
    })
    console.log(targetTweet);

    if(targetTweet){
        const replyToRetweet = targetTweet.replies.find((reply) => {
            return reply.uuid === replyId
        })
        if(replyToRetweet.isRetweeted){
            replyToRetweet.retweets--
        }else{
            replyToRetweet.retweets++
        }
        replyToRetweet.isRetweeted = !replyToRetweet.isRetweeted
        console.log(replyToRetweet);
    }
    updateLocalStorage()
    render()
}

function createFeedHtml(){ // this creates the fed

    let feedHtml = ''


    let userInput = `
    <div id="user-input" class="user-input">
    <div class="tex">
        <img src="${user.avatar}" alt="" class="avatar">
        <textarea id="text-inp" placeholder="Whats happening?!"></textarea>
    </div>
    <button id="tweet-btn" class="tweet-btn">Tweet</button>
</div>`
feedHtml = userInput 

let createTweet = ``
tweetsArray.forEach(function(tweet){

    let userInputReply = `
    <div id="user-input" class="reply-input border">
    <div class="tex">
        <img src="${user.avatar}" alt="" class="avatar" >
        <textarea id="reply-${tweet.uuid}" placeholder="Tweet your reply!"></textarea>
    </div>
    <button id="reply-btn" class="tweet-btn" data-reply-btn="${tweet.uuid}">Reply</button>
</div>`

    let shareClass = ''
    if(tweet.isRetweeted){
        shareClass = 'shared'

    }
    let likeClass = ''
    let solid = ''
    if (tweet.isLiked){
        likeClass = 'liked'
        solid = 'fa-solid'
    }
// THIS CHANGES COLOR ON THE REPLIES WHEN THEY ARE LIKED AND RETWETED 

    let createReply = ''
    tweet.replies.forEach(function(reply){
        let replyLikeClass = ''
        let replySolid = ''
        let replyShared = ''
        
        if(reply.isLiked){
            replyLikeClass = 'liked'
            replySolid = 'fa-solid'
        }
        if(reply.isRetweeted){
            replyShared = 'shared'
        }
        //reply boiler plate 
        createReply += `
        <div class="reply border">
    <div class="inner-tweet">
        <div class="avatar">
            <img src="${reply.avatar}" alt="" >
        </div>
        <div class="inner">
            <div class="handle-name">
                <span>${reply.name}</span>
                <span class="italic-small">${reply.handle}</span>
            </div>
            <div class="content">
                <p>${reply.content}</p>
            </div>
            <div class="interactions">
            <div class="action-retweet"><span class ="${replyShared}">${reply.retweets}</span><i class="fa-solid fa-retweet ${replyShared}" data-retweet-reply="${reply.uuid}"></i></div>
            <div class="action-like"><span class = "${replyLikeClass}">${reply.likes}</span><i class="fa-regular fa-heart ${replyLikeClass} ${replySolid}" data-like-reply="${reply.uuid}"></i></div>
        </div>
        </div>
    </div>
</div>`
    })

    //tweet boiler plate 
     createTweet += `
    <article class="tweet">
    <div class="inner-tweet">
        <div class="avatar">
            <img src="${tweet.avatar}" alt="">
        </div>
        <div class="inner">
            <div class="handle-name">
                <span>${tweet.name}</span>
                <span class="italic-small">${tweet.handle}</span>
            </div>
            <div class="content">
                <p>${tweet.content}</p>
            </div>
            <div class="interactions">
                <div class="action-reply"><span data-reply="${tweet.uuid}">${tweet.replies.length}</span><i class="fa-regular fa-message" data-reply="${tweet.uuid}"></i></div>
                <div class="action-retweet"><span class =" ${shareClass}"data-retweet="${tweet.uuid}">${tweet.retweets}</span><i class="fa-solid fa-retweet ${shareClass}" data-retweet="${tweet.uuid}"></i></div>
                <div class="action-like "><span class = "${likeClass}" data-like="${tweet.uuid}">${tweet.likes}</span><i class="fa-regular fa-heart ${likeClass} ${solid}" data-like="${tweet.uuid}"></i></div>
            </div>
        </div>
    </div>
    <div id="replies-${tweet.uuid}" class="hidden">
    ${userInputReply}
    ${createReply}
    </div>
</article>
    `
})
feedHtml += createTweet
return feedHtml
}
function render(){
    document.getElementById('feed').innerHTML =createFeedHtml()

}
render()

