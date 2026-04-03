// components/RightSidebar.js
export default function RightSidebar() {
  return (
    <div className="_layout_right_sidebar_wrap">
      {/* You Might Like */}
      <div className="_layout_right_sidebar_inner">
        <div className="_right_inner_area_info _padd_t24 _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_right_inner_area_info_content _mar_b24">
            <h4 className="_right_inner_area_info_content_title _title5">
              You Might Like
            </h4>
            <span className="_right_inner_area_info_content_txt">
              <a className="_right_inner_area_info_content_txt_link" href="#0">
                See All
              </a>
            </span>
          </div>
          <hr className="_underline" />
          <div className="_right_inner_area_info_ppl">
            <div className="_right_inner_area_info_box">
              <div className="_right_inner_area_info_box_image">
                <img
                  src="/assets/images/Avatar.png"
                  alt="Image"
                  className="_ppl_img"
                />
              </div>
              <div className="_right_inner_area_info_box_txt">
                <h4 className="_right_inner_area_info_box_title">
                  Radovan SkillArena
                </h4>
                <p className="_right_inner_area_info_box_para">
                  Founder & CEO at Trophy
                </p>
              </div>
            </div>
            <div className="_right_info_btn_grp">
              <button type="button" className="_right_info_btn_link">
                Ignore
              </button>
              <button
                type="button"
                className="_right_info_btn_link _right_info_btn_link_active"
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Your Friends */}
      <div className="_layout_right_sidebar_inner">
        <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_feed_top_fixed">
            <div className="_feed_right_inner_area_card_content _mar_b24">
              <h4 className="_feed_right_inner_area_card_content_title _title5">
                Your Friends
              </h4>
              <span className="_feed_right_inner_area_card_content_txt">
                <a
                  className="_feed_right_inner_area_card_content_txt_link"
                  href="#0"
                >
                  See All
                </a>
              </span>
            </div>
            <form className="_feed_right_inner_area_card_form">
              <input
                className="form-control _feed_right_inner_area_card_form_inpt"
                type="search"
                placeholder="Search friends"
              />
            </form>
          </div>

          <div className="_feed_bottom_fixed">
            {/* Friends List - feed.html এর মতো */}
            <div className="_feed_right_inner_area_card_ppl">
              <div className="_feed_right_inner_area_card_ppl_box">
                <img
                  src="/assets/images/people2.png"
                  alt=""
                  className="_box_ppl_img"
                />
                <div className="_feed_right_inner_area_card_ppl_txt">
                  <h4>Ryan Roslansky</h4>
                  <p>CEO of Linkedin</p>
                </div>
              </div>
              <div className="_feed_right_inner_area_card_ppl_side">
                <span style={{ color: "#0ACF83" }}>●</span>
              </div>
            </div>
            {/* আরও ফ্রেন্ড যোগ করো */}
          </div>
        </div>
      </div>
    </div>
  );
}
