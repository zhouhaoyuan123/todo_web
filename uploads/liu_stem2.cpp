#include <cmath>
#include <iostream>
#include <algorithm>
using namespace std;

int main() {
	int n, ans = 0;
	cin >> n;
	int rocks[n], average = 0;
	for (int i = 0; i < n; i++) {
		cin >> rocks[i];
		average += rocks[i];
	}
	average /= n;
	int i = 0;
	do {
		int a[3] = {0};
		if (i == 0) {
			a[0] = n - 1;
			a[1] = i + 1;
			a[2] = i;
		} else {
			a[0] = i - 1;
			a[1] = i + 1;
			a[2] = i;
		}
		for (int j = 0; j < 3; j++) {
			int tmp = 0;
			if (j == 0 && (rocks[a[j]] == rocks[a[1]] || rocks[a[j]] == rocks[a[2]])) {
				tmp = 1;
			} else if (j == 1 && (rocks[a[j]] == rocks[a[0]] || rocks[a[j]] == rocks[a[2]])) {
				tmp = 1;
			} else if (j == 2 && (rocks[a[j]] == rocks[a[0]] || rocks[a[j]] == rocks[a[1]])) {
				tmp = 1;
			}
			if (rocks[a[j]] > average && tmp == 0) {
				ans += (rocks[a[j]] - average);
			}
			rocks[a[j]] = average;
		}
		i++;
	} while (i < n - 2);
	cout << ans;
	return 0;
}