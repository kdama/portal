#Portal – TokyoTech Portal Auto-Login Extension for Chrome

##概要
Portal は、TokyoTech Portal システムに自動でログインするための Chrome 拡張機能です。

##使い方
1. Portal のオプション ページを開きます。[ツール] → [拡張機能] から [Portal] を探してください。
* Matrix 欄にあなたのマトリクス コードを入力してください。[Tab] キーを使うとスムーズに入力できます。
* Mode を選択してください。デフォルトでは [No op.] が選択されています。
  * No op. -- Portal は何もしません。マトリクス コードのメモとして使ってください。
  * Auto-Complete -- Portal は自動で 3 個の入力欄を埋めて、[OK] ボタンにフォーカスを移動します。[OK] ボタンを 1 回クリックするだけで、あるいは [Space] キーを 1 回押すだけで、ログインができます。
  * Auto-Complete-Login -- Portal は自動で 3 個の入力欄を埋めたあと、1 秒後に [OK] ボタンを自動でクリックします。もはや [OK] ボタンをクリックする必要も無いということです。

##技術的解説
TokyoTech Portal のマトリクス入力ページの URL は、常に `https://portal.nap.gsic.titech.ac.jp/GetAccess/Login?Template=idg_key` で始まります。この接頭辞から始まるURLにアクセスしたとき、ページに含まれる入力欄のラベルを解析して、マトリクスの要素をテキストボックスに自動的に入力します。つまり、あなたは [OK] ボタンをクリックするだけでログインすることができるのです。

##既知の問題
認証後に、次のエラー メッセージがコンソールに表示されます。

> `Uncaught ReferenceError: checkflag is not defined`

しかしこれは正規のログイン方法でも現れるようですので、たぶん問題はありません。TokyoTech Portal 側のバグだと思います。

##免責
Portal は、あなたのマトリクス コードの全ての要素をオフラインデータとして格納します。マトリクス コードが外部に送信されることは、通常はありません。しかしながら、もし Portal や Chrome に脆弱性があれば、外部に送信されたり、傍受される可能性があります。この場合、開発者は全力で責任を逃れようとするでしょう。利便性とのトレードオフを考えてご利用ください。