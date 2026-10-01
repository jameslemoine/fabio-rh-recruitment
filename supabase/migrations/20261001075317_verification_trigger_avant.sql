-- Le joueur doit exister avant l'insertion de la vérification (clé étrangère) : trigger avant insertion
drop trigger verifications_maj_joueur on public.verifications;
create trigger verifications_maj_joueur
before insert on public.verifications
for each row execute function private.verification_vers_joueur();
