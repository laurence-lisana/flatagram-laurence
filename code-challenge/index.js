document.addEventListener('DOMContentLoaded', function () {
    const title = document.querySelector('card-title');
    const myRequest = new Request('http://localhost:3000/images')
    const commentRequest = new Request('http://localhost:3000/comments')
    const image= document.querySelector('card-image');
    const like = document.querySelector('like-button');
    const likeCount = document.querySelector('like-count');
    const comments = document.querySelector('comment');
    const form = document.querySelector('comment-form');
    const commentList = document.querySelector('comments-list');
    let count = 0;

    // fetch  data from server
    fetch(myRequest)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // looping (for loop)
            for (let i = 0; i < data.length; i++) {
                let obj = data[0];
                title.innerHTML = `${obj.title}`;
                image.src = `${obj.image}`;
// adding event listeners
                like.addEventListener('click', () => {
                    count++;
                    likeCount.innerHTML = `${count} likes`;
                }

                )
            }

        });
    commentList.innerHTML = "";
    // fetch data from server
    fetch(commentRequest)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            // the for loop
            for (let i = 0; i < data.length; i++) {
                let newComment = data[i];
                // console.log(newComment);

                const li = document.createElement("li");
                li.innerHTML = `${newComment.content}`;
                commentList.appendChild(li);
            }
        });
        // add event listeners
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const postComments = document.getElementById("comment").value;
        console.log(postComments);
        if (postComments == "") {
            alert("Enter a comment");
            return;
        }
// commands for adding comments
        fetch(commentRequest, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                imageId: 1,
                // id: { id },
                content: postComments,
            }),
        });
    });
})