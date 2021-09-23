import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-questions',
  templateUrl: './common-questions.component.html',
  styleUrls: ['./common-questions.component.scss'],
})
export class CommonQuestionsComponent implements OnInit {
  panelOpenState = false;

  questions = [
    {
      id: 0,
      ques: 'ماهو اطول جسر بحري في العالم؟ ',
      ans: 'جسر الملك فهد الذي يصل السعوديه بالبحرين طوله 25كلم.',
    },
    {
      id: 1,
      ques: 'ماهو اطول جسر بحري في العالم؟ ',
      ans: 'جسر الملك فهد الذي يصل السعوديه بالبحرين طوله 25كلم.',
    },
    {
      id: 2,
      ques: 'ماهو اطول جسر بحري في العالم؟ ',
      ans: 'جسر الملك فهد الذي يصل السعوديه بالبحرين طوله 25كلم.',
    },
    {
      id: 3,
      ques: 'ماهو اطول جسر بحري في العالم؟ ',
      ans: 'جسر الملك فهد الذي يصل السعوديه بالبحرين طوله 25كلم.',
    },
    {
      id: 4,
      ques: 'ماهو اطول جسر بحري في العالم؟ ',
      ans: 'جسر الملك فهد الذي يصل السعوديه بالبحرين طوله 25كلم.',
    },
    {
      id: 4,
      ques: 'ماهو اطول جسر بحري في العالم؟ ',
      ans: 'جسر الملك فهد الذي يصل السعوديه بالبحرين طوله 25كلم.',
    },
    {
      id: 4,
      ques: 'ماهو اطول جسر بحري في العالم؟ ',
      ans: 'جسر الملك فهد الذي يصل السعوديه بالبحرين طوله 25كلم.',
    },
    {
      id: 4,
      ques: 'ماهو اطول جسر بحري في العالم؟ ',
      ans: 'جسر الملك فهد الذي يصل السعوديه بالبحرين طوله 25كلم.',
    },

  ];
  
  constructor() {}

  ngOnInit(): void {}
}
