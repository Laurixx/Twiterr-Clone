// make it that when you reply to a tweet , it gets added to the replies array DONE
// fix the add tweet function so if it empty dont tweet DONE
// also try to make it a modal but dont stress if it doenst work 
// comment and scan all js


import { tweetsArray } from "./data.js";
import { user } from "./user-info.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', function(e){
   console.log(e.target.dataset);
    if(e.target.dataset.like){
        like(e.target.dataset.like)
    }
    if(e.target.dataset.retweet){
        retweet(e.target.dataset.retweet)
    }
    if(e.target.dataset.reply){
        reply(e.target.dataset.reply)
    }
 
    if(e.target.id === 'tweet-btn'){
        addtweet()
    }
    if(e.target.id === 'reply-btn'){
        addReply(e.target.dataset.replyBtn)
    }
    if(e.target.dataset.likeReply){
        likeReply(e.target.dataset.likeReply)
    }if(e.target.dataset.retweetReply)
    retweetReply(e.target.dataset.retweetReply)
})

function createFeedHtml(){

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



function addtweet (){
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
    tweetsArray.unshift(createTweet)
    render()
 }

   }

function like(tweetId){
    const targetTweet = tweetsArray.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(targetTweet.isLiked){
        targetTweet.likes--
    }
    else{
        targetTweet.likes++

    }
    targetTweet.isLiked = !targetTweet.isLiked

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

    render()
}
function reply (tweetId){
 const targetTweet = tweetsArray.filter(function(tweet){
    return tweet.uuid === tweetId
 })[0]
    document.getElementById(`replies-${tweetId}`).classList.toggle('hidden')

}

function addReply (tweetId){
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
        render()
    }
}

function likeReply(replyId) {
    const targetReply = tweetsArray.find((tweet) => {
      return tweet.replies.find((reply) => {
        return reply.uuid === replyId;
      });
    });
  
    if (targetReply) {
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
render()
  }
function retweetReply (replyId){
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
    render()
}
function render(){
    document.getElementById('feed').innerHTML =createFeedHtml()
}
render()
