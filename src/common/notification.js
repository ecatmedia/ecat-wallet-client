import { store } from 'react-notifications-component';

function showNotification(title, message, type) {
  store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'bottom',
    container: 'bottom-center',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    showIcon: true,
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
}

export { showNotification };
