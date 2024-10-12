import {Buffer} from 'buffer';

const imageRequest = (key:any, edits:any) => {

        const config = JSON.stringify({
        bucket: "images.kofc9544.ca",
        key: key,
        edits: edits
    })

    return `${Buffer.from(config).toString('base64')}`;
    }

    export const formatImage = (key:any) => {
                const signatureSmall = imageRequest(key, {
                    "resize": {
                        "width": 200,
                        "height": 200,
                        "fit": "inside"
                    }
                });

                return `https://images.tc-testing-check.net/${signatureSmall}`;

}
