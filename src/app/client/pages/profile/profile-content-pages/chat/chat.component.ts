import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Track } from 'ngx-audio-player';

import { DomSanitizer } from '@angular/platform-browser';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  message: string | null;
  submit = false;

  // recording
  startRec = false;
  record;
  showRecordButtons;
  interval1;
  menuitTime: number = 0;
  interval2;
  secCalc = 0;

  private _seccondTime: number = 0;

  get seccondTime(): any {
    if (this._seccondTime < 10) {
      return '0' + this._seccondTime;
    } else {
      return this._seccondTime;
    }
  }

  // select photo
  showPanel = false;
  // for pannel
  initailPhoto;
  filePicker = [
    {
      id: 1,
      file: null,
      imageShow: null,
      type: null,
      msg: null,
    },
  ];

  constructor(
    private san: DomSanitizer,
    private audioRecorderService: NgAudioRecorderService
  ) {
    this.audioRecorderService.recorderError.subscribe((recorderErrorCase) => {
      // Handle Error
    });
  }

  ngOnInit(): void {}

  post(post: NgForm | null): void {
    if (post === null) {
      this.filePicker.splice(-1, 1);
      console.log(this.filePicker);
      this.showPanel = false;
      return;
    }
    console.log(post.value);
    // clear fields
    this.message = '';
    // this.filePicker = [];
  }

  playerSettings = {
    msaapDisplayTitle: false,
    msaapDisplayPlayList: false,
    msaapDisplayVolumeControls: false,
    msaapDisplayRepeatControls: false,
    msaapDisplayArtist: false,
    msaapDisplayDuration: false,
    msaapDisablePositionSlider: false,
  };

  msaapPlaylist1: any[] = [
    {
      title: 'Audio One Title',
      link: '',
      artist: 'Audio One Artist',
    },
  ];

  msaapPlaylist2: any[] = [
    {
      title: 'Audio One Title',
      link: 'https://server8.mp3quran.net/ahmad_huth/001.mp3',
      artist: 'Audio One Artist',
    },
  ];

  // voice recorder
  startRecording() {
    this.audioRecorderService.startRecording();
    this.startTimerRecord();
    this.startRec = true;
  }

  // accept record
  stopRecording() {
    this.audioRecorderService
      .stopRecording(OutputFormat.WEBM_BLOB)
      .then((output) => {
        console.log(output);
        const record = this.san.bypassSecurityTrustUrl(URL.createObjectURL(output));

        this.msaapPlaylist1.map((x) => (x.link = record));
        console.log(record);
      })
      .catch((errrorCase) => {
        // Handle Error
      });
    this.stopTimerRecord();
  }

  startTimerRecord(): void {
    this.interval2 = setInterval(() => {
      this.menuitTime = Math.floor(this.secCalc / 59);
      if (this._seccondTime >= 59) {
        this._seccondTime = 0;
      }
      this.secCalc++;
      this._seccondTime++;
    }, 1000);
  }

  stopTimerRecord(): void {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
    this.menuitTime = 0;
    this._seccondTime = 0;
    this.secCalc = 0;
    this.startRec = false;
  }

  cancelRecodingTimer(): void {
    this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output) => {
      console.log('record canceld');
    });
    this.stopTimerRecord();
  }

  // file selector
  onSelectFile(event, files: FileList | null, id: number | null): void {
    const file = files[0];

    // image reader
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    // file 'll send to API
    const selectedFile = this.filePicker.find((x) => x.id === id);

    const newSelector = {
      id:
        Math.max.apply(
          null,
          this.filePicker.map((x) => x.id)
        ) + 1,
      file: null,
      imageShow: null,
      type: null,
      msg: null,
    };

    if (!file) {
      return;
    }

    /**************/
    if (id === -1) {
      const fileType = file.type;
      this.filePicker.push(newSelector);
      const lastFile = this.filePicker.find((x) =>
        Math.max.apply(
          null,
          this.filePicker.map((x) => x.id)
        )
      );

      reader.onload = (event) => {
        lastFile.file = file;
        lastFile.type = fileType;
      };
      console.log(this.filePicker);
      return;
    }

    /**************/
    if (id === 0) {
      this.showPanel = true;

      this.filePicker.push(newSelector);
      const maxId = this.filePicker.find((x) =>
        Math.max.apply(
          null,
          this.filePicker.map((x) => x.id)
        )
      );

      reader.onload = (event) => {
        maxId.imageShow = reader.result;
        maxId.file = file;
        this.initailPhoto = reader.result;
      };
      return;
    }

    if (file.type.match(/image\/*/)) {
      this.showPanel = true;

      reader.onload = (_event) => {
        selectedFile.imageShow = reader.result;
      };
      selectedFile.file = file;
    }
    //  else {
    //   selectedFile.msg = 'main.errorMessages.invalid_file_type';
    //   setTimeout(() => {
    //     selectedFile.msg = '';
    //   }, 2000);
    // }

    this.filePicker.push(newSelector);
    console.log(this.filePicker);
  }

  closePhotoPannel(): void {
    this.showPanel = false;
    this.filePicker = [];
  }
}
