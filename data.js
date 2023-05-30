import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

 export const tweetsArrayData = [
    {
        name: 'maria Swarez',
        handle: '@mariaSZ',
        avatar: "images/natalya-ukolova-BJZNEuuAbpg-unsplash.jpg" ,
        content:  'Some tweet content',
        isLiked: false, 
        isRetweeted: false,
        likes: 1,
        retweets: 1,
        replies: [
            {
                name: 'John Doe',
                handle: '@johndoe',
                avatar: 'images/avatar2.jpg',
                content: 'Reply to the tweet',
                isLiked: false,
                isRetweeted: false,
                likes: 0,
                retweets: 0,
                uuid: uuidv4()
            }
        ],
        uuid: uuidv4()
    },
    {
        name: 'Emily Smith',
        handle: '@emilysmith',
        avatar: "images/neom-gKfSdzieIJc-unsplash.jpg",
        content: 'Another tweet',
        isLiked: true,
        isRetweeted: false,
        likes: 10,
        retweets: 2,
        replies: [
            {
                name: 'Jane Doe',
                handle: '@janedoe',
                avatar: 'images/avatar4.jpg',
                content: 'Reply to Emily',
                isLiked: false,
                isRetweeted: false,
                likes: 2,
                retweets: 0,
                uuid: uuidv4()
            },
            {
                name: 'John Smith',
                handle: '@johnsmith',
                avatar: 'images/avatar5.jpg',
                content: 'Another reply',
                isLiked: false,
                isRetweeted: false,
                likes: 5,
                retweets: 1,
                uuid: uuidv4()
            }
        ],
        uuid: uuidv4()
    },
    // Add two more objects representing people here
    {
        name: 'Sarah Johnson',
        handle: '@sarahjohnson',
        avatar: "images/nima-sarram-4JMOnj7NFKM-unsplash.jpg",
        content: 'Hello everyone!',
        isLiked: false,
        isRetweeted: false,
        likes: 0,
        retweets: 0,
        replies: [],
        uuid: uuidv4()
    },
    {
        name: 'Michael Brown',
        handle: '@michaelbrown',
        avatar: "images/onur-senay-DZISnDZ_--o-unsplash.jpg",
        content: 'Just sharing some thoughts',
        isLiked: true,
        isRetweeted: true,
        likes: 20,
        retweets: 3,
        replies: [
            {
                name: 'Chris Davis',
                handle: '@chrisdavis',
                avatar: 'images/avatar8.jpg',
                content: 'Great tweet!',
                isLiked: false,
                isRetweeted: false,
                likes: 3,
                retweets: 0,
                uuid: uuidv4()
            },
            {
                name: 'Emma Wilson',
                handle: '@emmawilson',
                avatar: 'images/avatar9.jpg',
                content: 'I agree!',
                isLiked: false,
                isRetweeted: false,
                likes: 2,
                retweets: 0,
                uuid: uuidv4()
            }
        ],
        uuid: uuidv4()
    }
];
