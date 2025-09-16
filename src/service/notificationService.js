var notificationQueue = []


function clearQueue() {
  notificationQueue.shift()
}

export function addToNotificationQueue(message) {
  notificationQueue.push(message)
}

export function returnNotificationQueue() {
  return notificationQueue;
}
