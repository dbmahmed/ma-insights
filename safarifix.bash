#! /bin/bash

TARGET="./web-build/expo-service-worker.js"

# The purpose of this script is to work around a bug in safari's service worker
# version discovery logic, which does not follow importScript() statements when
# determining whether a new service worker is byte-same as the old one.
#
# So, we make *every* new publication be byte different by concatting
# time-since-epoch to the bottom of the service worker.  This is not ideal, in
# the sense that it will agressively cause updates regardless of whether they
# are warranted by a changing manifest.  For example, we may want to trigger
# updates to our users publications on our end to add new wrapper code, for
# instance. Before, since the relevant app files would hash the same, browsers
# would properly ignore that publication and not update users apps installed on
# their phones.
#
# Now, they will "update" regardless, since this timestamp is always going to be
# in the future and thus different from the last version of the service worker
# they already have cached.
#
# So thank Safari for making PWAs technically worse for Android and Firefox.
# I'm sure that was not intentional, Apple.
#
if [ "$FLAG_PWA" == "true" ]; then
  if [ -f "$TARGET" ]; then
    echo "writing epoch to $TARGET ..."
    DATE_EPOCH_SEC=$(date +%s)
    echo "//$DATE_EPOCH_SEC" >> $TARGET
    echo "done!"
  else
    echo "ERR: PWA enabled, but could not find target for Safari fix"
    exit 1
  fi
fi
