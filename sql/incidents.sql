CREATE OR REPLACE TABLE incidents
(id INT AUTO_INCREMENT PRIMARY KEY,
piirkond ENUM('teadmata', 'Harjumaa', 'Hiiumaa', 'Ida-Virumaa', 'J�gevamaa', 'J�rvamaa', 'L��nemaa', 'L��ne-Virumaa', 'P�rnumaa', 'P�lvamaa', 'Raplamaa', 'Saaremaa', 'Tartumaa', 'Valgamaa', 'Viljandimaa', 'V�rumaa') NOT NULL,
kliendi_nr INT NOT NULL, FOREIGN KEY (kliendi_nr) REFERENCES clients (id) ON DELETE CASCADE ON UPDATE CASCADE,
keel ENUM('teadmata', 'eesti', 'vene', 'inglise', 'muu') NOT NULL,
vanus ENUM('teadmata', 'alla 18', '18-24', '25-49', '50-64', '65+') NOT NULL,
puue BOOL NOT NULL,
lapsed TINYINT NOT NULL,
rasedus BOOL NOT NULL,
elukoht ENUM('teadmata', 'Harjumaa', 'Hiiumaa', 'Ida-Virumaa', 'J�gevamaa', 'J�rvamaa', 'L��nemaa', 'L��ne-Virumaa', 'P�rnumaa', 'P�lvamaa', 'Raplamaa', 'Saaremaa', 'Tartumaa', 'Valgamaa', 'Viljandimaa', 'V�rumaa') NOT NULL,
fuusiline_vagivald BOOL NOT NULL,
vaimne_vagivald BOOL NOT NULL,
majanduslik_vagivald BOOL NOT NULL,
seksuaalne_vagivald BOOL NOT NULL,
inimkaubandus BOOL NOT NULL,
teadmata_vagivald BOOL NOT NULL,
partner_vagivallatseja BOOL NOT NULL,
ekspartner_vagivallatseja BOOL NOT NULL,
vanem_vagivallatseja BOOL NOT NULL,
laps_vagivallatseja BOOL NOT NULL,
sugulane_vagivallatseja BOOL NOT NULL,
tookaaslane_vagivallatseja BOOL NOT NULL,
muu_vagivallatseja BOOL NOT NULL,
vagivallatseja_vanus ENUM('teadmata', 'alla 18', '18-24', '25-49', '50-64', '65+') NOT NULL,
vagivallatseja_sugu ENUM('teadmata', 'Mees', 'Naine') NOT NULL,
laps_ohver BOOL NOT NULL,
vana_ohver BOOL NOT NULL,
muu_ohver BOOL NOT NULL,
politsei BOOL NOT NULL,
umarlauad TINYINT NOT NULL,
marac BOOL NOT NULL,
perearst_kaasatud BOOL NOT NULL,
emo_kaasatud BOOL NOT NULL,
naistearst_kaasatud BOOL NOT NULL,
politsei_kaasatud BOOL NOT NULL,
prokuratuur_kaasatud BOOL NOT NULL,
lastekaitse_kaasatud BOOL NOT NULL,
kov_kaasatud BOOL NOT NULL,
tsiviilkohus_kaasatud BOOL NOT NULL,
kriminaalkohus_kaasatud BOOL NOT NULL,
haridusasutus_kaasatud BOOL NOT NULL,
mtu_kaasatud BOOL NOT NULL,
tuttavad_kaasatud BOOL NOT NULL,
rahastus BOOL NOT NULL);