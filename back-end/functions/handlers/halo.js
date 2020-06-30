

exports.createDeviceInIotCore = (req, res) => {
    async function create(hi) {
        const iot = require('@google-cloud/iot');
        const client = new iot.v1.DeviceManagerClient();
        const projectId = await client.getProjectId();
        const parent = client.registryPath(projectId, 'us-central1','Halo'); // Your Location and registry name
        const device = {id:'halo device 1', hi:hi} // The device id, and in general the device information that you want to send
        const [response] = await client.createDevice({parent, device});
        console.log(`${response.name} created.`);
        res.send(response.name);
    }

    async function exe(){
        try{
            const someValue = await create(req.body.hi);
        }catch (error){
            console.error(error);
        }
    }

    exe();
}