export function diff(date_future, date_now) {
  date_future = new Date(date_future);
  date_now = new Date(date_now);
  let delta = Math.abs(date_future - date_now) / 1000;
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  const seconds = delta % 60;
  return { days, hours, minutes, seconds };
}

export function deleteComment(replyComments, idx) {
  if (Array.isArray(replyComments)) {
    for (let i = 0; i < replyComments.length; i++) {
      if (replyComments[i].idx === idx) {
        replyComments.splice(i, 1);
        return;
      }
      if (replyComments[i].replies)
        deleteComment(replyComments[i].replies, idx);
    }
  }

  if (replyComments.replies) {
    deleteComment(replyComments.replies, idx);
  }
}

export function addNewReply(replyComments, idx, comment) {
  console.log(replyComments, idx);
  if (!idx) {
    if (replyComments.replies) {
      replyComments.replies.push(comment);
    } else replyComments.replies = [comment];
  }
  if (Array.isArray(replyComments)) {
    for (let i = 0; i < replyComments.length; i++) {
      if (replyComments[i].idx === idx) {
        if (replyComments[i].replies) replyComments[i].replies.push(comment);
        else replyComments[i].replies = [comment];
        return;
      }
      if (replyComments[i].replies)
        addNewReply(replyComments[i].replies, idx, comment);
    }
  } else if (replyComments.replies) {
    addNewReply(replyComments.replies, idx, comment);
  } else {
    replyComments.replies = [comment];
  }
}

export function toggleLike(replyComments, idx) {
  if (Array.isArray(replyComments)) {
    for (let i = 0; i < replyComments.length; i++) {
      if (replyComments[i].idx === idx) {
        if (replyComments[i].likedByAuthor) {
          replyComments[i].likedByAuthor = false;
          replyComments[i].likes -= 1;
        } else {
          replyComments[i].likedByAuthor = true;
          replyComments[i].likes = replyComments[i].likes
            ? replyComments[i].likes + 1
            : 1;
        }
        return;
      }
      if (replyComments[i].replies) toggleLike(replyComments[i].replies, idx);
    }
  } else if (replyComments.replies) {
    toggleLike(replyComments.replies, idx);
  }
}

export function getAllAuthors(replyComments, exclude) {
  return replyComments.reduce((acc, curr) => {
    if (curr.authorName && curr.authorName !== exclude)
      acc.push(curr.authorName);
    if (curr.replies) acc.push(...getAllAuthors(curr.replies));
    return [...new Set(acc)];
  }, []);
}

export function totalComments(replyComments) {
  return replyComments.reduce((acc, curr) => {
    if (curr.authorName) acc++;
    if (curr.replies) acc += totalComments(curr.replies);
    return acc;
  }, 0);
}

export function formatDate(date) {
  date = new Date(date);
  const { days, hours, minutes } = diff(date, new Date());
  if (days !== 0) return `${days} d`;
  else if (hours !== 0) return `${hours} h`;
  else if (minutes !== 0) return `${minutes} m`;
  else return `a few seconds ago`;
}
