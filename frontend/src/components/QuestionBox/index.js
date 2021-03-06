import UserInfo from '../UserInfo';
import QuestionArea from '../QuestionArea';
import TopAnswer from '../TopAnswer';
import ActionBar from '../ActionBar';
import CommentBar from '../CommentBar';
import CommentsArea from '../CommentsArea';
import QuestionModal from '../QuestionModal';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getQuestions } from '../../store/questions';
import { getAnswers } from '../../store/answers';
import './QuestionBox.css';

const QuestionBox = ({ showModal, openModal }) => {
  const dispatch = useDispatch();
  let questions = useSelector((state) => Object.values(state.questions));
  const text = useSelector((state) => state.search.text);
  const answers = useSelector((state) => Object.values(state.answers));
  const userSession = useSelector((state) => state.session.user);

  const [isCommentsOpen, setIsCommentsOpen] = useState(-1);
  const [userOptions, setUserOptions] = useState(-1);
  const [topAnswerId, setTopAnswerId] = useState(null);

  // if you want to reverse the order of displayed items
  // questions = questions.reverse();

  const showComments = (i) => {
    setIsCommentsOpen(isCommentsOpen === i ? -1 : i);
  };

  const showUserOptions = (i) => {
    setUserOptions(userOptions === i ? -1 : i);
  };

  useEffect(() => {
    dispatch(getQuestions());
    dispatch(getAnswers());
  }, [dispatch]);

  return (
    <div className='question-box-container'>
      {questions
        .filter((q) => {
          if (text === '') {
            return q;
          } else if (q.title.toLowerCase().includes(text.toLowerCase())) {
            return q;
          } else {
            return null;
          }
        })
        .map((question, i) => (
          <div className='question-link' key={question.id}>
            <div className='question-box'>
              <QuestionModal
                showModal={showModal}
                openModal={openModal}
                question={question}
              />
              <UserInfo
                question={question}
                id={i}
                showUserOptions={showUserOptions}
                userOptions={userOptions}
                setUserOptions={setUserOptions}
                showModal={showModal}
                openModal={openModal}
              />
              <QuestionArea question={question} />
              <TopAnswer
                answers={answers}
                question={question}
                qId={question.id}
                setTopAnswerId={setTopAnswerId}
              />
              <ActionBar
                id={i}
                showComments={showComments}
                question={question}
                qId={question.id}
              />
              <CommentBar
                id={i}
                isCommentsOpen={isCommentsOpen}
                question={question}
                qId={question.id}
                answers={answers}
                userSession={userSession}
              />
              <CommentsArea
                id={i}
                isCommentsOpen={isCommentsOpen}
                question={question}
                qId={question.id}
                userSession={userSession}
                topAnswerId={topAnswerId}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default QuestionBox;
