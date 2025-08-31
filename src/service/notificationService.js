var notificationQueue = []


export function addToNotificationQueue(message) {
  notificationQueue.add(message)
}

export function returnNotificationQueue() {
  return notificationQueue;
}
