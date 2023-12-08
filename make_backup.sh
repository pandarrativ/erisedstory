#!/bin/bash
set -exu
fn="Nightmare-data-backup-$(date '+%Y%m%dT%H%M%z').tgz"
root="$PWD"
pushd backend
tar -zcvf "$root/../$fn" database.db server/static/
