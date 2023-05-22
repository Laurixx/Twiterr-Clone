import { tweetsArray } from "./data.js";
import { user } from "./user-info.js"

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
})

function createFeedHtml(){

    let feedHtml = ''

    let userInput = `
    <div id="user-input">
    <div class="textare">
        <img src="${user.avatar}" alt="">
        <textarea id="text-inp" placeholder="Whats happening?"></textarea>
    </div>
    <button id="tweet-btn">Tweet</button>
</div>`
feedHtml = userInput 

let createTweet = ``
tweetsArray.forEach(function(tweet){

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
let replyLikeClass = ''
let replySolid = ''
  
    tweet.replies.forEach(function(reply){
        if(reply.isLiked){
            replyLikeClass = 'liked'
            replySolid = 'fa-solid'
        }
    })

    let createReply = ''
    tweet.replies.forEach(function(reply){
        createReply = `
        <div class="reply">
    <div class="inner-tweet">
        <div class="avatar">
            <img src="${reply.avatar}" alt="">
        </div>
        <div class="inner">
            <div class="handle-name">
                <span>${reply.name}</span>
                <span>${reply.handle}</span>
            </div>
            <div class="content">
                <p>${reply.content}</p>
            </div>
            <div class="interactions">
            <div class="actions"><span class =" ${shareClass}">${reply.retweets}</span><i class="fa-solid fa-retweet ${shareClass}" data-retweet="${reply.uuid}"></i></div>
            <div class="actions"><span class = "${replyLikeClass}">${reply.likes}</span><i class="fa-regular fa-heart ${replyLikeClass} ${replySolid}" data-like="${reply.uuid}"></i></div>
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
                <span>${tweet.handle}</span>
            </div>
            <div class="content">
                <p>${tweet.content}</p>
            </div>
            <div class="interactions">
                <div class="actions"><span>${tweet.replies.length}</span><i class="fa-regular fa-message  " data-reply="${tweet.uuid}"></i></div>
                <div class="actions"><span class =" ${shareClass}">${tweet.retweets}</span><i class="fa-solid fa-retweet ${shareClass}" data-retweet="${tweet.uuid}"></i></div>
                <div class="actions"><span class = "${likeClass}">${tweet.likes}</span><i class="fa-regular fa-heart ${likeClass} ${solid}" data-like="${tweet.uuid}"></i></div>
            </div>
        </div>
    </div>
    <div id="replies-${tweet.uuid}" class="hidden">
    ${createReply}
    </div>
</article>
    `
})
feedHtml += createTweet
return feedHtml
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
function render(){
    document.getElementById('feed').innerHTML =createFeedHtml()
}
render()