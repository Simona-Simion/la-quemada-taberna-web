export const ACTIVE_MENU_QUERY = `
  *[
    _type == "menuEdition" &&
    menuType == $menuType &&
    isActive == true
  ][0] {
    internalName,
    menuType,
    edition,
    year,

    "pdfUrl": select(
      $language == "en" => coalesce(
        pdfEn.asset->url,
        pdfEs.asset->url
      ),

      $language == "fr" => coalesce(
        pdfFr.asset->url,
        pdfEs.asset->url
      ),

      pdfEs.asset->url
    )
  }
`;

export const BAR_SELECTION_QUERY = `
  *[_type == "barSelection"][0] {
    internalName,

    "barItems": barItems[
      isVisible != false
    ] {
      _key,

      "name": select(
        $language == "en" => coalesce(
          name.en,
          name.es
        ),

        $language == "fr" => coalesce(
          name.fr,
          name.es
        ),

        name.es
      )
    },

    "productItems": productItems[
      isVisible != false
    ] {
      _key,

      "name": select(
        $language == "en" => coalesce(
          name.en,
          name.es
        ),

        $language == "fr" => coalesce(
          name.fr,
          name.es
        ),

        name.es
      )
    },

    "wineItems": wineItems[
      isVisible != false
    ] {
      _key,

      "name": select(
        $language == "en" => coalesce(
          name.en,
          name.es
        ),

        $language == "fr" => coalesce(
          name.fr,
          name.es
        ),

        name.es
      )
    }
  }
`;

export const TAVERN_INFO_QUERY = `
  *[_type == "tavernInfo"][0] {
    internalName,

   "hours": {
    "weekday": {
      "label": select(
        $language == "en" => coalesce(
          hours.weekday.label.en,
          hours.weekday.label.es
        ),
        $language == "fr" => coalesce(
          hours.weekday.label.fr,
          hours.weekday.label.es
        ),
        hours.weekday.label.es
      ),
      "opens": hours.weekday.opens,
      "closes": hours.weekday.closes
    },

    "saturday": {
      "label": select(
        $language == "en" => coalesce(
          hours.saturday.label.en,
          hours.saturday.label.es
        ),
        $language == "fr" => coalesce(
          hours.saturday.label.fr,
          hours.saturday.label.es
        ),
        hours.saturday.label.es
      ),
      "opens": hours.saturday.opens,
      "closes": hours.saturday.closes
    },

    "sunday": {
      "label": select(
        $language == "en" => coalesce(
          hours.sunday.label.en,
          hours.sunday.label.es
        ),
        $language == "fr" => coalesce(
          hours.sunday.label.fr,
          hours.sunday.label.es
        ),
        hours.sunday.label.es
      ),
      "closed": hours.sunday.closed
    }
  },

    "temporaryNotice": {
      "isVisible": temporaryNotice.isVisible == true,
      "noticeType": temporaryNotice.noticeType,
      "startAt": temporaryNotice.startAt,
      "endAt": temporaryNotice.endAt,

      "message": select(
        $language == "en" => coalesce(temporaryNotice.message.en, temporaryNotice.message.es),
        $language == "fr" => coalesce(temporaryNotice.message.fr, temporaryNotice.message.es),
        temporaryNotice.message.es
      ),

      "actionLabel": select(
        $language == "en" => coalesce(temporaryNotice.actionLabel.en, temporaryNotice.actionLabel.es),
        $language == "fr" => coalesce(temporaryNotice.actionLabel.fr, temporaryNotice.actionLabel.es),
        temporaryNotice.actionLabel.es
      ),

      "actionUrl": temporaryNotice.actionUrl
    },

    "contact": {
      "email": contact.email,
      "phone": contact.phone,
      "whatsapp": contact.whatsapp,
      "instagramUrl": contact.instagramUrl,
      "googleMapsUrl": contact.googleMapsUrl
    }
  }
`;

export const BAR_GALLERY_QUERY = `
  *[_type == "barGallery"][0] {
    internalName,

    "cards": cards[] {
      _key,
      cardId,
      "isVisible": isVisible != false,

      "images": images[
        isVisible != false &&
        defined(desktop.asset)
      ] {
        _key,
        "desktop": desktop.asset->url,
        "mobile": coalesce(
          mobile.asset->url,
          desktop.asset->url
        ),

        "alt": select(
          $language == "en" => coalesce(
            alt.en,
            alt.es
          ),

          $language == "fr" => coalesce(
            alt.fr,
            alt.es
          ),

          alt.es
        )
      }
    }
  }
`;

export const SEO_SETTINGS_QUERY = `
  *[_type == "seoSettings"][0] {
    internalName,
    siteName,
    canonicalUrl,

    "title": select(
      $language == "en" => coalesce(
        title.en,
        title.es
      ),

      $language == "fr" => coalesce(
        title.fr,
        title.es
      ),

      title.es
    ),

    "description": select(
      $language == "en" => coalesce(
        description.en,
        description.es
      ),

      $language == "fr" => coalesce(
        description.fr,
        description.es
      ),

      description.es
    ),

    "socialImage": socialImage.asset->url,

    "socialImageAlt": select(
      $language == "en" => coalesce(
        socialImageAlt.en,
        socialImageAlt.es
      ),

      $language == "fr" => coalesce(
        socialImageAlt.fr,
        socialImageAlt.es
      ),

      socialImageAlt.es
    )
  }
`;
