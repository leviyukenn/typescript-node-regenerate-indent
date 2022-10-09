import { describe, test } from "@jest/globals";
import { readFileSync } from "fs";
import { join } from "path";
import { regenerateIndent } from "./regenetateIndent";

describe("ファイルのインデントを復活させる", () => {
  test("インデントを復活させた結果がデモファイルの内容と一致する", () => {
    const inputFile = join(__dirname, "../public/src.txt");
    const demoFile = join(__dirname, "../public/出力サンプル.txt");

    const inputfileContent = readFileSync(inputFile, "utf-8");
    const demofileContent = readFileSync(demoFile, "utf-8");

    const result = regenerateIndent(inputfileContent);

    expect(result).toBe(demofileContent);
  });

  test("改行コードがない場合、エラーをスローする", () => {
    expect(() => regenerateIndent("abc")).toThrow(
      "インプットファイルに改行コードが存在しないため、利用できません。"
    );
  });
});
