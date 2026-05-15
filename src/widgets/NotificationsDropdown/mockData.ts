import type { NotificationData } from './types';

export const mockNotifications: NotificationData[] = [
  {
    id: '1',
    title: 'Николай принял ваш обмен',
    description: 'Перейдите в профиль, чтобы обсудить детали',
    date: 'сегодня',
    status: 'new',
    actionLabel: 'Перейти',
  },
  {
    id: '2',
    title: 'Татьяна предлагает вам обмен',
    description: 'Примите обмен, чтобы обсудить детали',
    date: 'сегодня',
    status: 'new',
    actionLabel: 'Перейти',
  },
  {
    id: '3',
    title: 'Олег предлагает вам обмен',
    description: 'Примите обмен, чтобы обсудить детали',
    date: 'вчера',
    status: 'viewed',
  },
  {
    id: '4',
    title: 'Игорь принял ваш обмен',
    description: 'Перейдите в профиль, чтобы обсудить детали',
    date: '23 мая',
    status: 'viewed',
  },
];