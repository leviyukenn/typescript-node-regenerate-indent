import { readFileSync } from "fs";
import { basename, dirname, join } from "path";
import { main } from "./index";

describe("index.tsをテストする", () => {
  test("入力パラメータが漏れた場合、メッセージを出力する", () => {
    const logSpy = jest.spyOn(console, "log");
    main();
    expect(logSpy)
      .toHaveBeenCalledWith(`インプットファイルのパスを一番目、アウトプットファイルのパスを二番目のパラメータとして入力してください。
        node [スクリプトregenerateIndentのパス] [インプットファイルのパス] [アウトプットファイルのパス]
        例：node ./lib/regenerateIndent.js public/src.txt public/output.txt`);
  });

  test("アウトプットファイルのパスの入力が漏れた場合、メッセージを出力する", () => {
    process.argv[2] = "public/src.txt";
    const logSpy = jest.spyOn(console, "log");
    main();
    expect(logSpy)
      .toHaveBeenCalledWith(`インプットファイルのパスを一番目、アウトプットファイルのパスを二番目のパラメータとして入力してください。
        node [スクリプトregenerateIndentのパス] [インプットファイルのパス] [アウトプットファイルのパス]
        例：node ./lib/regenerateIndent.js public/src.txt public/output.txt`);
  });

  test("インプットファイルのパスが存在しない場合、メッセージを出力する", () => {
    process.argv[2] = "public/input.txt";
    process.argv[3] = "public/output.txt";
    const logSpy = jest.spyOn(console, "log");
    main();
    expect(logSpy).toHaveBeenCalledWith(
      `インプットファイルが見つりません。ファイルパスの入力が間違っていないかご確認ください:${join(
        process.cwd(),
        process.argv[2]
      )}`
    );
  });

  test("アウトプットするディレクトリのパスが存在しない場合、メッセージを出力する", () => {
    process.argv[2] = "public/src.txt";
    process.argv[3] = "test/output.txt";
    const logSpy = jest.spyOn(console, "log");
    main();
    expect(logSpy).toHaveBeenCalledWith(
      `アウトプットするディレクトリが見つりません。ファイルパスの入力が間違っていないかご確認ください:${join(
        process.cwd(),
        process.argv[3]
      )}`
    );
  });

  test("インデントを復活させてアウトプットしたファイルの内容がデモファイルの内容と一致する", () => {
    const outputFile = join(__dirname, "../public/outputTest.txt");
    const demoFile = join(__dirname, "../public/出力サンプル.txt");
    process.argv[2] = "public/src.txt";
    process.argv[3] = "public";
    main();
    const outputfileContent = readFileSync(outputFile, "utf-8");
    const demofileContent = readFileSync(demoFile, "utf-8");

    expect(outputfileContent).toBe(demofileContent);
  });

});
