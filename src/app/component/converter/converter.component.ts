import { Component } from '@angular/core';

import {FFmpeg} from "../../../assets/@ffmpeg/ffmpeg/package";
import {fetchFile} from "../../../assets/@ffmpeg/util/package";


@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {
  file?: File;
  audioSrc?: string;
  fileName: string = "";
  startConvert: string = "";

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
    this.transcode()
  }

  async transcode() {
    this.startConvert = "Transcoding...";
    const ffmpeg = new FFmpeg();
    ffmpeg.on('log', (message: any) => console.log(message));
    await ffmpeg.load({
      coreURL: '/assets/@ffmpeg/core/package/dist/umd/ffmpeg-core.js'
    })
    const name = this.file!.name;
    this.fileName = `${name.split(".")[0]}.m4a`;
    await ffmpeg.writeFile(name, await fetchFile(this.file));
    await ffmpeg.exec(['-i', name, '-c:a', 'aac', '-vn', this.fileName]);
    const audioData = await ffmpeg.readFile(this.fileName);
    this.startConvert = "";
    this.audioSrc = URL.createObjectURL(new Blob([(audioData as Uint8Array).buffer], {type: 'audio/m4a'}));
  }
}
