export function regenerateIndent(fileData: string) {
  const methodName = "regenerateIndent";
  if (fileData.includes("\n")) {
  } else {
    throw new Error(
      "インプットファイルに改行コードが存在しないため、利用できません。"
    );
  }

  //Unix系もWindows系も通用できるように、改行コードはLFを使う
  const lineFeedCode = "\n";

  const tab = "\t";

  //左中括弧のAsciiコード
  const startBraceAsciiCode = 123;
  //右中括弧のAsciiコード
  const endBraceAsciiCode = 125;
  try {
    //改行コードによりファイルを行ごとの配列に分割する
    const fileLines = fileData.split(lineFeedCode);

    //インデントの階層
    let indentNum = 0;

    for (let i = 0; i < fileLines.length; i++) {
      let line = fileLines[i];
      //現在の行に追加すべきインデントの数
      let currentLineIndentNum = indentNum;
      //一個目の右中括弧を見つけた場合のフラグ
      let firstEndBraceFlag = false;

      line.split("").forEach((char) => {
        const charAsciiCode = char.charCodeAt(0);
        //左中括弧の場合
        if (charAsciiCode === startBraceAsciiCode) indentNum++;

        if (charAsciiCode === endBraceAsciiCode && !firstEndBraceFlag) {
          //一個目の右中括弧の場合
          firstEndBraceFlag = true;
          currentLineIndentNum = --indentNum;
        } else if (charAsciiCode === endBraceAsciiCode) {
          //一個目以外の右中括弧の場合
          indentNum--;
        }
      });

      if (currentLineIndentNum > 0) {
        //現在の行にインデントを追加する
        line = tab.repeat(currentLineIndentNum) + line;
        fileLines[i] = line;
      }
    }

    return fileLines.join(lineFeedCode);
  } catch (error) {
    const errorMessage = `${methodName}で想定外エラーが発生しました:${error}`;
    throw new Error(errorMessage);
  }
}
