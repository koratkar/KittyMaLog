exports.now = function() {
    let dateObject = new Date()
    let options = {
        hour: '2-digit',
        minute: '2-digit'
    }
    return (dateObject.toLocaleTimeString([], options) + " on " + dateObject.toLocaleDateString([], {weekday: "long", day: "numeric", month: "long"}))
}

exports.today = function() {
    let dateObject = new Date() 
    let options = {
        weekday: "long", 
        day: "numeric",
        month: "long"
    }

    return (dateObject.toLocaleDateString([], options))
}