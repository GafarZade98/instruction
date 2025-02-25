export function formatMessageTime(time) {
    const formattedTime = new Date(time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })
    
    return formattedTime;
}