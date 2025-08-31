var notificationQueue = []


function clearQueue() {
  notificationQueue.shift()
}

export function addToNotificationQueue(message) {
  notificationQueue.add(message)
}

export function returnNotificationQueue() {
  return notificationQueue;
}
