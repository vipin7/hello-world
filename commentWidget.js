
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
    this.content = '';
    this.elem = '';
}

Comment.prototype.createCommentInput = function() {
    const div = document.createElement('div');
    const input = document.createElement('input');
    input.placeholder = 'Write a comment...';
    div.appendChild(input);
    this.elem.appendChild(input);
}

Comment.prototype.createCommentElement = function() {
    const div = document.createElement('div');
    div.id = this.id;
    const button = document.createElement('button');
    button.innerText = 'Comment';
    button.addEventListener('click', () => { this.createCommentInput(); }, false);
    div.appendChild(button);
    this.elem = div;
}


Comment.prototype.appendComment = function() {
    document.getElementById(this.attachedContentId).appendChild(this.elem);
}