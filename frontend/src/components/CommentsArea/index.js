import { useSelector, useDispatch } from 'react-redux';
import './CommentsArea.css';
import moment from 'moment';
import ShowMoreText from 'react-show-more-text';
import { useEffect } from 'react';
import { getUsers } from '../../store/user';
import { getQuestions } from '../../store/questions';

const CommentsArea = ({ id, isCommentsOpen, question, topAnswerId }) => {
  const dispatch = useDispatch();
  const executeOnClick = (isExpanded) => {};
  const answers = useSelector((state) => Object.values(state.answers));
  const users = useSelector((state) => Object.values(state.users));

  let targetUser = [];
  const whenUserIdMatchesAnswerUserId = users.filter((user) => {
    return answers.filter(
      (answer) => Number(answer?.userId) === Number(user?.id)
    );
  });

  useEffect(() => {}, [question?.Comments]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={`ca-wrapper ${isCommentsOpen === id ? 'open' : 'hidden'}`}>
      {question?.Comments.map((comment) => (
        <div className='ca-container' key={comment.id}>
          <div className='ca-user-info'>
            <div>
              {whenUserIdMatchesAnswerUserId.forEach((user) => {
                if (user.id === comment.ownerId) {
                  targetUser = [user.profileImgUrl.toString(), user.username];
                }
              })}
              <img className='ca-user-picture' src={targetUser[0]} alt='' />
            </div>
            <div className='user-specifics-container'>
              <div className='ca-user-specifics'>{targetUser[1]}</div>
              <div className='comment-post-date'>
                Posted {moment(comment.createdAt).format('ddd, hA')}
              </div>
            </div>
          </div>
          <ShowMoreText
            lines={3}
            more='(more)'
            less='(less)'
            className='answer-content-container'
            anchorClass='my-anchor-css-class'
            onClick={executeOnClick}
            expanded={false}
            width={560}
          >
            <div className='answer-content-container'>{comment.content}</div>
          </ShowMoreText>
          <div className='vote-container'></div>
        </div>
      ))}
    </div>
  );
};

export default CommentsArea;
