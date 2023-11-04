<template>
  <div>
    <h1>
      {{ $t("rules.title") }}
    </h1>
    <!-- <p>
        {{ $t("rules.p1") }}
      </p>
      <p>
        {{ $t("rules.p2") }}
      </p> -->
    <h1>ADZ VERITYAPPS LTD</h1>
    <p>
      Reg number: HE 443324 Address: Prodromou, 75, Oneworld Parkview House, 4th
      floor, 2063, Nicosia
    </p>
    <p>Effective date: 11/10/2021</p>

    <h2>Introduction</h2>
    <p>
      ADZ VERITYAPPS LTD, hereinafter referred to as "ADZ VERITYAPPS,"
      "Company," "we," "us," or "our," is a Cyprus-based limited liability
      company that offers a range of products and services. This includes the
      operation of our website heymaty.com (the "Site"). Individuals who access
      the Site, whether through the World Wide Web or any other means, are
      referred to as "Guests" of the Site. Guests who register for a User
      Account or receive Services via the Site are referred to as "Users" of the
      Site.
    </p>

    <h2>The Agreement</h2>
    <p>
      These Terms of Service, along with our Privacy Policy and any additional
      policies or agreements provided to Users (collectively, the "Agreement"),
      are binding between ADZ VERITYAPPS and all Users, as applicable to each
      User. By registering for a User Account or receiving Services via the
      Site, you agree to be bound by this Agreement. This Agreement will remain
      in effect indefinitely, except for the provisions mentioned in Section
      2.3. Any changes to this Agreement will be effective immediately upon
      posting on our website. Continued use of the Site or receipt of Services
      after such changes constitutes acceptance of the updated Agreement.
    </p>

    <h2>Prohibition Warning</h2>
    <p>
      Minors Prohibited: The Site contains adult-oriented content and is not
      intended for children. Only individuals who are at least 18 years old and
      have reached the age of majority in their jurisdiction may access the
      Site. We strictly prohibit individuals who do not meet these age
      requirements from accessing the Site.
    </p>
    <p>
      Material Exploitative of Children Prohibited: We strictly prohibit any
      content involving minors on the Site. If you come across any visual media,
      real or simulated, depicting minors engaged in sexual activity or any
      other exploitation of children, please report it to us immediately. We
      fully cooperate with law enforcement agencies investigating child
      exploitation.
    </p>
    <p>
      Prostitution and Sex Trafficking Prohibited: The Site prohibits any use of
      its services for engaging in, supporting, promoting, or facilitating
      prostitution or sex trafficking. This includes sharing personal contact
      details or arranging face-to-face meetings. Any evidence of such
      activities should be promptly reported to us, and we will take appropriate
      action, including reporting to law enforcement agencies.
    </p>

    <h2>Services</h2>
    <p>
      Services provided via the Site include Site Services and Creator Services.
    </p>
    <p>
      Site Services: The Site offers a digital communication platform for Guests
      and Users. Services include fulfilling Guest fantasies through voice, text
      messages, picture messages, and video messages. Users must use HEYDADDY
      Credit, available for purchase on the Site, to access Creator Services.
      HEYDADDY Credit is solely a payment method and does not grant Users rights
      or credits to any other websites.
    </p>
    <p>
      Creator Directory: The Site maintains a directory of Creator profiles.
      Users can browse, search, and locate Creators based on their preferences
      via the Directory.
    </p>
    <p>
      Creator Services: Creator Services include receiving and sending messages
      (text, voice, video), and participating in video calls with Users. Rates
      for Creator Services are determined by the Company and Creators and are
      subject to change.
    </p>

    <h2>User Accounts</h2>
    <p>
      User Accounts are created to provide Users with Services and track their
      behavior and preferences. Users must register using a valid email address
      and choose an alias and password. User Accounts are subject to
      verification, and Users must provide accurate and up-to-date information.
      Users are responsible for all activities conducted through their User
      Accounts and must comply with the User Code of Conduct. The Company
      reserves the right to suspend or terminate User Accounts for violations.
    </p>

    <h2>Communications</h2>
    <p>
      By registering for a User Account
    </p>
  </div>
</template>

<script>
export default {
  name: "TermsContent",
};
</script>
<style lang="scss" scoped>
ol {
  counter-reset: item;
  margin-bottom: 20px;
  font-size: 20px;
  line-height: 150%;
  color: #575757;
  font-weight: 400;
  list-style-type: decimal;
  padding: revert !important;
  margin: revert !important;
}
li {
  display: block;
  // padding: initial !important;
  // margin: initial !important;
}
li:before {
  content: counters(item, ".") " ";
  counter-increment: item;
}
</style>
