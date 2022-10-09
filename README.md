### 使い方

#### 1. typescript -> javascript にコンパイルする

```
yarn build
```

コンパイルした結果は`./lib`に格納される

#### 2. nodejs のスクリプトを実行する

- アウトプットファイルのパスは実在するディレクター内のファイルのパスを指定する必要があります、ただしファイル自体は実在である必要がありません。

```
node [スクリプトのパス] [インデントを復活させたいファイルのパス] [アウトプットファイルのパス]
```

例：

```
node ./lib/regenerateIndent.js public/src.txt public/output.txt
```

#### 3. Unit Test

Unit Test を実行する

```
yarn test
```
