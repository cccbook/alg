# 第 7 章 - 蒙地卡羅法 Monte-Carlo

## 蒙地卡羅演算法 (Monte Carlo Algorithm)

利用亂數隨機抽樣的方式以計算某種解答的演算法，被稱為蒙地卡羅演算法，其中最簡單的方法是直接取樣算法。

舉例而言，假如我們不知道半徑為 1 的圓形面積，那麼就可以利用亂數隨機取樣 1百萬個 X=random(-1...1), Y=random)(-1...1) 之間的的值，然後看看有多少點落在 x^2 + y^2 <=1 的範圍之內來計算 P(在圓之內)。最後利用 4 * P(在圓之內) 就可以計算出該圓形的面積。


## 貝氏網路 (Bayesian Network)

貝氏網路是用來描述機率因果關係的網路，對於一個已知的貝氏網路 (Bayesian Network)，其中的某個樣本 $$(x_1, ..., x_n)$$  的機率可以用下列算式表示

$$P(x_1, ..., x_n) = \prod_{i=1}^{n} P(x_i | parent(X_i))$$

貝氏網路也可以被視為某種隱馬可夫模型，其中某些節點是可觀察節點 (X)，某些節點是隱含節點 (Z) ，我們可以透過蒙地卡羅馬可夫算法計算某個分布 $$P(x_1, ..., x_n)$$ 的機率值。

## 參考文獻

* [A Brief Introduction to Graphical Models and Bayesian Networks](http://www.cs.ubc.ca/~murphyk/Bayes/bnintro.html)
* [A brief introduction to Bayes' Rule](http://www.cs.ubc.ca/~murphyk/Bayes/bayesrule.html)
* <http://www.cs.ubc.ca/~murphyk/Software/BNT/Talks/BNT_mathworks.ppt>


## 簡介

在機率理論中，所謂的機率模型，通常是指某種機率獨立性的假設。舉例而言，在簡單貝氏模型 (Naive Bayes Model) 當中，就假設所有的隨機變數 X1, X2,..., Xn 相對於某個前提 C 而言都是條件獨立的，因此可以寫成如下算式。 

$$P(x_1 ... x_n| c) = P(x_1|c) \cdots P(x_n | c)$$

這種機率獨立性的假設，就是一種統計上的假說，我們必須驗證這樣的假說是否合理，如果驗證合理才能使用該公式，否則將會造成龐大的誤差。

## 計算統計學中的假說

有時候，我們會將假說的概念 h 放入機率分布函數中，當成機率分布的參數之一，例如 P(x, h) 其實代表了由 h 假說所決定的一個機率特定機率分布 p，作用在樣本 x 上的結果 。

在具有假說 h 的情況之下，P(h) 代表由假說 h 所決定的一個機率分布，這是一個特定的機率分布，按照上述規則，原本應該用某個小寫的 p 所代表，但是由於引入了函數形式的關係，我們用 P(h) 代表該假說所決定的特定機率分布。

大寫的 P 符號通常則代表假說 $P(h_1), P(h_2), ... P(h_n)$ 所形成的機率分布集合，計算統計學的主要任務是找出最好的假說，以便用該假說的機率分布進行預測。這個尋找最佳假說的過程可用下列公式表達。

$$\arg\max_h P(h|x,y) = \arg\max_h P(x,y|h) \frac{P(h)}{P(x,y)}$$

計算統計學通常會用程式 (演算法) 尋找最符合訓練資料 $(x_1,y_1) (x_2,y_2) ...., (x_n,y_n)$ 的假說 P(h)，這個過程稱為學習。當電腦完成學習的程序之後，就可以利用 P(h) 預測整個系統的下一個輸出之機率。

通常在預測進行時系統會取得某些輸入值 x，然後再利用該輸入值找到一個最可能的輸出值，也就是找到讓 P(y|x,h) 最大的輸出 y，因此整個預測程序仍然是一個最佳化的過程，如下列公式所示。

$$\arg\max_y P(y|x,h)$$

## 計算統計學中的學習

要找出計算統計學中的最佳假說，通常採用最大似然法則作為最佳化的目標算式，但實際上最大似然法則與最大商法則乃是一體的兩面，因此也常採用最大商法則進行學習。

### 『最大熵法則』 與 『最大似然法則』

$$
\begin{aligned}\sum_z P(Z=z|x,h) L(x,Z=z|h) &= \sum_z \frac{P(x,Z=z,h)}{P(x,h)} \log P(x,Z=z|h) \\&= \frac{1}{P(x,h)} \sum_z P(x,Z=z,h) \log P(x,Z=z|h) \\&= \frac{1}{P(x,h)}H(x,Z|h)\end{aligned}
$$



