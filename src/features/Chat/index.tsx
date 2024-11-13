import React from 'react';
import cls from './Chat.module.scss';
import { ChatField } from './ui/ChatField';
import Icon from '../../shared/Icon';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../app/redux/theme/selectors';

export const Chat: React.FC = () => {
  const { theme } = useSelector(selectTheme);
  const [isChatOpened, setIsChatOpened] = React.useState<boolean>(false);

  const handleOpenChat = () => {
    setIsChatOpened(true);
  };
  const handleCloseChat = () => {
    setIsChatOpened(false);
  };

  return (
    <>
      {!isChatOpened ? (
        <div className={cls.chat}>
          <button
            onClick={handleOpenChat}
            className={cls.chat_btn}
            style={{ backgroundImage: `url('/chat-button-${theme}.webp')` }}>
            <Icon.Chat />
          </button>
        </div>
      ) : (
        <ChatField onClose={handleCloseChat} />
      )}
    </>
  );
};
