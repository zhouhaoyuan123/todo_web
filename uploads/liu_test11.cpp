#include <iostream>
using namespace std;

int main() {
	int a, b, n, flag = 0;
	cin >> a >> b;
	if (a > b) {
		n = a;
	} else {
		n = b;
	}
	for (int i = 2; i < n; i++) {
		if (i != a && i != b && (a % i == 0 || b % i == 0)) {
			flag = 1;
			break;
		}
	}
	if (flag == 1) {
		cout << "fail" << endl;
	} else {
		cout << "win" << endl;
	}
	return 0;
}