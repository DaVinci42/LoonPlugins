let obj = JSON.parse($response.body);

if (obj.user) {
  obj.user.vip = true;
  obj.user.vip_ep = true;
  obj.user.vip_og = true;
  if (!obj.user.vip_years || obj.user.vip_years < 1) {
    obj.user.vip_years = 1;
  }
}

if (obj.account) {
  obj.account.display_ads = false;
}

$done({ body: JSON.stringify(obj) });
