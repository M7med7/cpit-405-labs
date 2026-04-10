function setCookie(name, value, days) {
  var expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
  var match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";
}

function clearAllCookies() {
  deleteCookie("likes");
  deleteCookie("dislikes");
  deleteCookie("userVote");
  deleteCookie("userComment");
  deleteCookie("comments");
}

var COOKIE_VERSION = "2";

if (getCookie("cookieVersion") !== COOKIE_VERSION) {
  clearAllCookies();
  setCookie("cookieVersion", COOKIE_VERSION, 30);
}

var likeBtn = document.getElementById("like-btn");
var dislikeBtn = document.getElementById("dislike-btn");
var likeCountEl = document.getElementById("like-count");
var dislikeCountEl = document.getElementById("dislike-count");
var voteStatus = document.getElementById("vote-status");

var commentInput = document.getElementById("comment-input");
var commentBtn = document.getElementById("comment-btn");
var commentStatus = document.getElementById("comment-status");
var commentsList = document.getElementById("comments-list");

var resetBtn = document.getElementById("reset-btn");

var modal = document.getElementById("confirm-modal");
var modalCancel = document.getElementById("modal-cancel");
var modalConfirm = document.getElementById("modal-confirm");

var toast = document.getElementById("toast");
var cursorBlob = document.getElementById("cursor-blob");

var likes = parseInt(getCookie("likes")) || 0;
var dislikes = parseInt(getCookie("dislikes")) || 0;
var userVote = getCookie("userVote");
var userComment = getCookie("userComment");
var comments = JSON.parse(getCookie("comments") || "[]");

var blobX = window.innerWidth / 2;
var blobY = window.innerHeight / 2;
var targetX = blobX;
var targetY = blobY;

function updateCursorBlob() {
  blobX += (targetX - blobX) * 0.06;
  blobY += (targetY - blobY) * 0.06;
  cursorBlob.style.transform = "translate3d(" + (blobX - 250) + "px, " + (blobY - 250) + "px, 0)";
  requestAnimationFrame(updateCursorBlob);
}

requestAnimationFrame(updateCursorBlob);

document.addEventListener("mousemove", function (e) {
  targetX = e.clientX;
  targetY = e.clientY;
});

function renderCounts() {
  likeCountEl.textContent = likes;
  dislikeCountEl.textContent = dislikes;
}

function renderVoteState() {
  likeBtn.classList.remove("selected", "disabled");
  dislikeBtn.classList.remove("selected", "disabled");

  if (userVote === "like") {
    likeBtn.classList.add("selected");
    dislikeBtn.classList.add("disabled");
    voteStatus.textContent = "You liked this.";
  } else if (userVote === "dislike") {
    dislikeBtn.classList.add("selected");
    likeBtn.classList.add("disabled");
    voteStatus.textContent = "You disliked this.";
  } else {
    voteStatus.textContent = "";
  }
}

function renderComments() {
  if (comments.length === 0) {
    commentsList.innerHTML = '<p class="comments-empty">No comments yet.</p>';
    return;
  }
  commentsList.innerHTML = comments
    .map(function (text) {
      return '<div class="comment-item">' + escapeHtml(text) + '</div>';
    })
    .join("");
}

function renderCommentForm() {
  if (userComment !== null) {
    commentInput.disabled = true;
    commentBtn.disabled = true;
    commentStatus.textContent = "You've already left a comment.";
  } else {
    commentInput.disabled = false;
    commentBtn.disabled = false;
    commentStatus.textContent = "";
  }
}

function handleVote(type) {
  if (userVote) return;

  if (type === "like") {
    likes++;
    likeBtn.classList.add("animate");
  } else {
    dislikes++;
    dislikeBtn.classList.add("animate");
  }

  userVote = type;
  setCookie("likes", likes, 30);
  setCookie("dislikes", dislikes, 30);
  setCookie("userVote", userVote, 30);

  renderCounts();
  renderVoteState();
  showToast(type === "like" ? "👍 Thanks for your vote!" : "👎 Vote recorded.");
}

likeBtn.addEventListener("animationend", function () {
  likeBtn.classList.remove("animate");
});

dislikeBtn.addEventListener("animationend", function () {
  dislikeBtn.classList.remove("animate");
});

likeBtn.addEventListener("click", function () {
  handleVote("like");
});

dislikeBtn.addEventListener("click", function () {
  handleVote("dislike");
});

function submitComment() {
  var text = commentInput.value.trim();
  if (!text || userComment !== null) return;

  userComment = text;
  comments.push(text);
  setCookie("userComment", userComment, 30);
  setCookie("comments", JSON.stringify(comments), 30);

  commentInput.value = "";
  renderComments();
  renderCommentForm();
  showToast("💬 Comment added!");
}

commentBtn.addEventListener("click", submitComment);

commentInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    submitComment();
  }
});

resetBtn.addEventListener("click", function () {
  modal.classList.add("visible");
});

modalCancel.addEventListener("click", function () {
  modal.classList.remove("visible");
});

modal.addEventListener("click", function (e) {
  if (e.target === modal) modal.classList.remove("visible");
});

modalConfirm.addEventListener("click", function () {
  modal.classList.remove("visible");

  clearAllCookies();

  likes = 0;
  dislikes = 0;
  userVote = null;
  userComment = null;
  comments = [];

  renderCounts();
  renderVoteState();
  renderComments();
  renderCommentForm();
  showToast("🔄 Everything has been reset.");
});

var toastTimer = null;

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = setTimeout(function () {
    toast.classList.remove("visible");
  }, 2500);
}

function escapeHtml(str) {
  var el = document.createElement("div");
  el.appendChild(document.createTextNode(str));
  return el.innerHTML;
}

renderCounts();
renderVoteState();
renderComments();
renderCommentForm();
