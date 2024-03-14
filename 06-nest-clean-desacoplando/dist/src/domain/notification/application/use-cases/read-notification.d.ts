import { Either } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
interface ReadNotificationUseCaseRequest {
    recipientId: string;
    notificationId: string;
}
type ReadNotificationUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
    notification: Notification;
}>;
export declare class ReadNotificationUseCase {
    private notificationsRepository;
    constructor(notificationsRepository: NotificationsRepository);
    execute({ recipientId, notificationId, }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse>;
}
export {};
