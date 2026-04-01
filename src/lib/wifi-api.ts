import cockpit from 'cockpit';
import type { WifiDevice, NetInterface, APConfig, APStatus } from './types';

const BIN_PATH = '/usr/share/cockpit/wifi-ap/bin';

/** Spawn a privileged backend script */
function runScript (script: string, args: string[] = []): Promise<string> {
    return cockpit.spawn([`${BIN_PATH}/${script}`, ...args], {
        superuser: 'require',
        err: 'message'
    });
}

/** List available wireless devices */
export async function wifiDevices (): Promise<WifiDevice[]> {
    const output = await runScript('wifi-devices.py');
    return JSON.parse(output);
}

/** List non-wireless interfaces available for bridging */
export async function netInterfaces (): Promise<NetInterface[]> {
    const output = await runScript('net-interfaces.py');
    return JSON.parse(output);
}

/** Get Access Point configuration */
export async function apGetConfig (): Promise<APConfig | null> {
    try {
        const content = await cockpit.file('/etc/cockpit-wifi-ap/ap.conf', {
            superuser: 'try'
        }).read();
        return JSON.parse(content);
    } catch {
        return null;
    }
}

/** Save Access Point configuration */
export async function apSetConfig (config: APConfig): Promise<void> {
    await cockpit.file('/etc/cockpit-wifi-ap/ap.conf', {
        superuser: 'require'
    }).replace(JSON.stringify(config, null, 2));
}

/** Start the Access Point */
export async function apStart (): Promise<string> {
    return runScript('ap-start.sh');
}

/** Stop the Access Point */
export async function apStop (): Promise<string> {
    return runScript('ap-stop.sh');
}

/** Get Access Point runtime status */
export async function apStatus (): Promise<APStatus> {
    const output = await runScript('ap-status.py');
    return JSON.parse(output);
}
