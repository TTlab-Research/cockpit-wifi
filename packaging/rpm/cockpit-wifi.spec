Name:           cockpit-wifi
Version:        0.1.1
Release:        1%{?dist}
Summary:        Cockpit plugin for complete WiFi management
License:        MIT
URL:            https://github.com/TTlab-official/cockpit-wifi
Source0:        %{name}-%{version}.tar.gz

BuildArch:      noarch
BuildRequires:  nodejs >= 18
BuildRequires:  npm

Requires:       cockpit >= 270
Requires:       NetworkManager
Requires:       python3
Requires:       dnsmasq
Requires:       iw
Recommends:     iptables

%description
cockpit-wifi provides a modern web interface for managing WiFi
connections and Access Point configuration through Cockpit.

Features:
- Scan and connect to WiFi networks
- Manage saved WiFi connections
- Create and manage WiFi Access Points (hotspot)
- DHCP server configuration via dnsmasq
- Internet sharing via NAT/masquerading
- Dark theme support via PatternFly 6
- Real-time dashboard with connection status

%prep
%autosetup

%build
npm ci
NODE_ENV=production ./build.js

%install
install -d %{buildroot}%{_datadir}/cockpit/wifi
cp -r dist/* %{buildroot}%{_datadir}/cockpit/wifi/
install -d %{buildroot}%{_sysconfdir}/cockpit-wifi

%files
%license LICENSE
%doc README.md
%{_datadir}/cockpit/wifi/
%dir %{_sysconfdir}/cockpit-wifi

%changelog
* Wed Apr 01 2026 TTlab <info@ttlab.it> - 0.1.1-1
- Fix ESLint errors: jsx-quotes, comma-dangle, no-use-before-define
- Fix Stylelint: @use senza estensione .scss
- Fix npm audit: brace-expansion moderate vulnerability

* Mon Mar 23 2026 TTlab <info@ttlab.it> - 0.1.0-1
- Initial release
