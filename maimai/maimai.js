const COLLEAGUE_TAB_TYPE = 700;

let obj = JSON.parse($response.body);

if (Array.isArray(obj.data)) {
  obj.data = obj.data.filter((item) => {
    if (!item || typeof item !== "object") {
      return true;
    }

    const isAd = item.type === "ad_show" || Boolean(item.newAdStyle);
    const hiddenCardTypes = [
      "company_circle_one_key_publish_card",
      "wish_cards_album"
    ];
    const isNoticeEntrance = item.card_type === "notice_entrance";
    return !isAd && !isNoticeEntrance && !hiddenCardTypes.includes(item.card_type);
  });
}

if (obj.circle_top) {
  obj.circle_top.core_data_show_cnt = 0;
  obj.circle_top.core_area_data_list = [];
}

if (obj.circle_publish_hint !== undefined) {
  obj.circle_publish_hint = "";
}

if (obj.guide_publish_icon) {
  obj.guide_publish_icon.show_icon = 0;
  obj.guide_publish_icon.show_text = 0;
}

if (obj.content && Array.isArray(obj.content.main_tabs_v7)) {
  const colleagueTab = obj.content.main_tabs_v7.find(
    (tab) => tab && tab.type === COLLEAGUE_TAB_TYPE
  );

  if (colleagueTab) {
    obj.content.default_tab_type = colleagueTab.type;
  }
}

$done({ body: JSON.stringify(obj) });
