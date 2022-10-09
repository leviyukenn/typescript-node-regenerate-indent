import { existsSync, readFileSync, writeFileSync } from "fs";
import path, { join } from "path";
import { regenerateIndent } from "./regenetateIndent";

export function main() {
  try {
    //コマンドラインからインプットファイルのパスを取得
    const inputFilePath = process.argv[2];
    //コマンドラインからアウトプットファイルのパスを取得
    const outputFilePath = process.argv[3];

    //インプットファイルとアウトプットファイルが入力されたかをチェック
    if (!inputFilePath || !outputFilePath) {
      console.log(
        `インプットファイルのパスを一番目、アウトプットファイルのパスを二番目のパラメータとして入力してください。
        node [スクリプトregenerateIndentのパス] [インプットファイルのパス] [アウトプットファイルのパス]
        例：node ./lib/regenerateIndent.js public/src.txt public/output.txt`
      );
      return;
    }

    const inputFile = join(process.cwd(), inputFilePath);
    //インプットファイルのパスが実在するかをチェック
    if (!existsSync(inputFile)) {
      console.log(
        `インプットファイルが見つりません。ファイルパスの入力が間違っていないかご確認ください:${inputFile}`
      );
      return;
    }

    const outputFile = join(process.cwd(), outputFilePath);
    const outputDir = path.dirname(outputFile);
    //アウトプットするディレクトリが実在するかをチェック
    if (!existsSync(outputDir)) {
      console.log(
        `アウトプットするディレクトリが見つりません。ファイルパスの入力が間違っていないかご確認ください:${outputFile}`
      );
      return;
    }

    console.log("ファイルの読み込みを開始");
    console.log(
      "対応するエンコードがUTF8のみとなるため、それ以外のエンコードの場合は文字化けの可能性があります。"
    );

    //インプットファイルの内容を読み込む
    const fileContent = readFileSync(inputFile, "utf-8");
    //インデントを復活させる
    const result = regenerateIndent(fileContent);

    //インデントを復活させた内容をアウトプットファイルに書き込む
    writeFileSync(outputFile, result, "utf-8");
    console.log(
      `インデント復活したファイルをアウトプットしました。ファイルパス:${outputFile}`
    );
  } catch (error) {
    console.log(`想定外エラーが発生しました:${error}`);
  }
}

main();
