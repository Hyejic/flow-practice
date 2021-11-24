const btn = document.querySelector(".btn_change");
const txtbox = document.querySelector("#user_input");
const output = document.querySelector("#result");

// copy and paste
// function txtCopyPaste(){
//   let userTxt = txtbox.value;
//   // print out to textarea
//   output.value = userTxt;
// }

//save
function txtSave(){
  const comArr = [];
  let userTxt = txtbox.value;
  let arrUserTxt = userTxt.split("");
  console.log('userTxt', userTxt)
  console.log('arrUserTxt', arrUserTxt)

  // userTxt.forEach(function(){
  //   arrUserTxt.push();
  // })
  
  // for(let i = 0; i < userTxt.length; i++){
  //   arrUserTxt.push();
  // }

  arrUserTxt.forEach((currentElement, index, array) => {
    // console.log(`요소: ${currentElement}`);
    // console.log(`index: ${index}`);
    // console.log(array);
    separation(currentElement);
  });

  //separation
  // separation(userTxt);
  function separation(userTxt){
    //초성
    const txt1 = [
      'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
      'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
      'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];
    //중성
    const txt2 = [
      'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
      'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
      'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
    ];
    //종성
    const txt3 = [
      '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
      'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
      'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
      'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];

    const koreanTxtCode = 44032;
    const txtCode = userTxt.charCodeAt(0);

    const size = txtCode - koreanTxtCode;

    const txt1Index = parseInt(size / 588);
    const txt2Index = parseInt((size - (txt1Index * 588)) / 28);
    const txt3Index = parseInt(size % 28);
    
    // console.log(userTxt,txt1[txt1Index],txt2[txt2Index],txt3[txt3Index])
    //텍스트 난독화 변환
    if(txt1[txt1Index] == 'ㄱ'){
      txt1[txt1Index] = 'ㄲ'
    }else if(txt1[txt1Index] == 'ㄷ'){
      txt1[txt1Index] = 'ㄸ'
    }else if(txt1[txt1Index] == 'ㅈ'){
      txt1[txt1Index] = 'ㅉ'
    }else if(txt1[txt1Index] == 'ㅅ'){
      txt1[txt1Index] = 'ㅆ'
    }else if(txt1[txt1Index] == 'ㅂ'){
      txt1[txt1Index] = 'ㅃ'
    }
    
    // console.log(userTxt,txt1[txt1Index],txt2[txt2Index],txt3[txt3Index])
    // return {
    //   txt1: txt1[txt1Index],
    //   txt2: txt2[txt2Index],
    //   txt3: txt3[txt3Index],
    // }
    txtCombine([txt1[txt1Index],txt2[txt2Index],txt3[txt3Index]]);
  }

  
  function txtCombine(textArr){
    let combineTxt;
    console.log(textArr[0]);
    if(textArr[0] !== undefined){
      const txt1 = textArr[0] || '';
      const txt2 = textArr[1] || '';
      const txt3 = textArr[2] || '';

      if(!txt2){
        return txt1;
      }

      const txt2Code = txt2.charCodeAt(0);

      const txt1Matching = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
        'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
        'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
      ].reduce((acc, cur, idx) => ({
          ...acc,
          [cur]: idx
      }), {});

      const txt3Matching = [
        '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
        'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
        'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
        'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
      ].reduce((acc, cur, idx) => ({
          ...acc,
          [cur]: idx
      }), {});

      const consonantStart = 12623;
      const koreanTxtCode = 44032;

      const txt1Index = txt1Matching[txt1];
      const txt2Index = txt2Code - consonantStart;
      const txt3Index = txt3Matching[txt3];

      combineTxt = String.fromCharCode(
        koreanTxtCode
        + txt1Index * 588
        + txt2Index * 28
        + txt3Index)
        console.log('combineTxt',combineTxt)
      }else{
        console.log('x')
        combineTxt = " ";
        console.log('combineTxt',combineTxt)
    }
    comArr.push(combineTxt);
  }
  

  let complateTxt = '';
  for(let i in comArr){
    complateTxt = comArr;
  }

  output.value = comArr.join("");
}