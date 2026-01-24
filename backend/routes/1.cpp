#include <iostream>
#include <bits/stdc++.h>
using namespace std;

int main() {
    pair<int , int> p = make_pair(0 , 1);

    auto &[x , y] = p;
    cout << x << ' ' << y << endl;
    cout << p.first << ' ' << p.second << endl;

    std::cout << __cplusplus << "\n";
}
