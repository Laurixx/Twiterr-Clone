import { tweetsArray } from './data.js'

function createFeed (){
    let feedHtml = ``

    tweetsArray.forEach(function(tweet){
        feedHtml +=`
        <article class="tweet">
        <div class="avatar-container">
            <img src="${tweet.avatar}" alt="" class="avatar">
        </div>
        <div class="inner">
                <div class="name-handle">
                    <span class="bold">${tweet.name} </span>
                    <span class="small-italic">${tweet.handle}</span>
                </div>
            <div class="post">${tweet.content}</div>
            <div class="tweet-interactions">
                <span>${tweet.replies.length}<i class="fa-regular fa-comment-dots" data-reply = "${tweet.uuid}"></i></span>
                <span>${tweet.likes}<i class="fa-solid fa-heart" data-like = "${tweet.uuid}"></i></span>
                <span>${tweet.retweets}<i class="fa-solid fa-retweet" data-retweet = "${tweet.uuid}"></i></span>
            </div>
        </div>
    </article>`
    })
    return feedHtml
}

function render(){
    document.getElementById('feed').innerHTML=createFeed()
}
render()


