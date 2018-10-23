
function Content(content, id) {
    this.content = content;
    this.elem = '';
    this.id = id;
}

Content.prototype.createContentDiv = function() {
    const div = document.createElement('div');
    div.id = this.id;
    const img = document.createElement('img');
    img.src = this.content;
    div.appendChild(img)
    this.elem = div;
}

Content.prototype.appendContentDiv = function() {
    document.body.appendChild(this.elem);
}

function Comment(attachedContentId, id) {
    this.attachedContentId = attachedContentId;
    this.id = id;
    this.commentContent = [];
    this.elem = '';
    this.commentDisplayDiv = '';
    this.addCommentInput = '';
}

Comment.prototype.createCommentInput = function() {
    console.log(this.addCommentInput);
    this.addCommentInput.style.display = 'block';
    this.addCommentInput.getElementsByTagName('input')[0].focus();
}

Comment.prototype.createCommentElement = function() {
    const div = document.createElement('div');
    div.id = this.id;
    div.className = "commentDiv";
    const commentButtonDiv = document.createElement('div');
    commentButtonDiv.className = 'commentButtonDiv';
    const commentIconDiv = document.createElement('div');
    commentIconDiv.className = "commentIconDiv";
    const commentIcon = document.createElement('img');
    commentIcon.src = 'icons/comment-white-oval-bubble.png';
    commentIconDiv.appendChild(commentIcon);
    commentButtonDiv.appendChild(commentIconDiv);
    const button = document.createElement('button');
    button.innerText = 'Comment';
    button.addEventListener('click', () => { this.createCommentInput(); }, false);
    commentButtonDiv.appendChild(button);
    div.appendChild(commentButtonDiv);
    this.elem = div;
    document.getElementById(this.attachedContentId).appendChild(this.elem);

    const inputDiv = document.createElement('div');
    inputDiv.style.display = 'none';
    const input = document.createElement('input');
    input.placeholder = 'Write a comment...';
    input.addEventListener('keypress', (event) => {
        if(event.keyCode == 13){
            this.addComment(input.value);
            this.renderComments();
            input.value = '';
        }
    })
    inputDiv.appendChild(input);
    this.addCommentInput = inputDiv;
    this.elem.appendChild(inputDiv);
}

Comment.prototype.appendComment = function() {
    document.getElementById(this.attachedContentId).appendChild(this.elem);
}

Comment.prototype.addComment = function(content) {
    this.commentContent.push({content, reply: []});
}

Comment.prototype.renderComments = function() {
    if(this.commentDisplayDiv)
        this.commentDisplayDiv.remove();
    const div = document.createElement('div');
    div.className = "commentContentParent";
    for(let i=0; i<this.commentContent.length; i++){
        const commentDiv = document.createElement('div');
        const commentTextDiv = document.createElement('div');
        commentTextDiv.className = "commentText";
        commentTextDiv.innerText = this.commentContent[i].content;
        commentDiv.appendChild(commentTextDiv);
        const replyButtonDiv = document.createElement('div');
        replyButtonDiv.className = "replyButtonDiv";
        const button = document.createElement('button');
        button.innerText = "Reply";
        replyButtonDiv.appendChild(button);
        commentDiv.appendChild(replyButtonDiv);
        const replyInputDiv = document.createElement('div');
        replyInputDiv.style.display = "none";
        replyInputDiv.className = "replyInputDiv";
        const input = document.createElement('input');
        input.placeholder = 'Write a reply...';
        input.addEventListener('keypress', (event) => {
            if(event.keyCode === 13){
                this.addReply(input.value, i);
                this.renderComments();
                input.value = '';
            }
        })
        replyInputDiv.appendChild(input);
        button.addEventListener("click", () => {
            replyInputDiv.style.display = 'block';
            input.focus();
        });
        commentDiv.appendChild(replyInputDiv);
        if(this.commentContent[i].reply.length){
            const replyDiv = document.createElement('div');
            replyDiv.className = "replyDiv";
            for(let reply of this.commentContent[i].reply){
                const replyTextDiv = document.createElement('div');
                replyTextDiv.className = "commentText";
                replyTextDiv.innerText = reply;
                replyDiv.appendChild(replyTextDiv);
            }
            commentDiv.appendChild(replyDiv);
        }
        div.appendChild(commentDiv);
    }
    this.elem.appendChild(div);
    this.commentDisplayDiv = div;
}

Comment.prototype.addReply = function(reply, i) {
    this.commentContent[i].reply.push(reply);
    this.renderComments();
}

////////
var content1 = new Content('pic1.jpg', 'c2');
content1.createContentDiv();
content1.appendContentDiv();
var comment1 = new Comment('c2', 'comm2');
comment1.createCommentElement();
comment1.appendComment();
//comment1.addComment("hi fam!!!");
//comment1.addComment("hello!!!");
//comment1.renderComments();