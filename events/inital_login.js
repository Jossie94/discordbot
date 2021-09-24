module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setPresence({ activities: [{ name: 'reaking havoc'},{ name: 'testing the havoc i reaked'},], status: 'online' });
    },
};