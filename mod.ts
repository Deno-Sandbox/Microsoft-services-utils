import { Snow_Linux } from "https://deno.land/x/linux@0.0.1/mod.ts"
let _Snow_Linux = new Snow_Linux()

export class Snow_Micosoft {
    private async execute(commande: any) {
        var content = "";
        var comcmd = commande.split(' ')
        var p = Deno.run({
            cmd: comcmd,
            stdout: "piped",
            stderr: "piped"
        });
        var {
            code
        } = await p.status();
        if (code === 0) {
            var rawOutput = await p.output();
            content = new TextDecoder().decode(rawOutput);
        } else {
            var rawError = await p.stderrOutput();
            var errorString = new TextDecoder().decode(rawError);
            console.log('[Error] - ' + errorString);
        }
        return content
    }


    constructor() {
        if(_Snow_Linux.isThisALinux()) {
            console.log("[Error] - Snow_Micosoft is only supported on Windows")
            Deno.exit(1)
        }
    }


    async ping(hostname) {
        var commande = 'ping ' + hostname
        var content = await this.execute(commande)
        return content
    }

    //sysrep interface

    async sysrep() {
        this.execute(`Sysprep /generalize /shutdown /oobe /quiet`)
    }


}