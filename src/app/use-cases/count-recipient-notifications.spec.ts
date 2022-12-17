import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';

import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('New friend request'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('New friend request'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('New friend request'),
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
